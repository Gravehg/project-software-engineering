const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const Support = require("../models/supportModel");
const { sendEmail } = require("../services/mailer");

const login = async (req, res) => {
  try {
    const decodedToken = JWT.verify(req.params.token, process.env.JWT_SIGN);
    const userId = decodedToken.userId;
    const roles = decodedToken.roles;
    const email = decodedToken.email;

    const loginToken = JWT.sign({ userId, roles, email }, process.env.JWT_SIGN);

    const rolesToCheck = [
      "LocalOrganizer",
      "GlobalOrganizer",
      "Judge",
      "Jammer",
      "Support",
    ];

    const hasAnyRole = rolesToCheck.some((role) => roles.includes(role));

    if (!hasAnyRole) {
      return res.redirect(`http://${process.env.URL}${process.env.APP_PORT}`); //Should send to login
    }

    res.cookie("sessionToken", loginToken, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    console.log("Roles", roles);
    if (roles.includes("GlobalOrganizer")) {
      return res.redirect(
        `http://${process.env.URL}${process.env.APP_PORT}/admin-users/admin-pool`
      );
    } else if (roles.includes("Support")) {
      return res.redirect(
        `http://${process.env.URL}${process.env.APP_PORT}/tickets-pool`
      );
    } else {
      return res.redirect(
        `http://${process.env.URL}${process.env.APP_PORT}/jammers-users`
      );
    }
  } catch (error) {
    return res
      .clearCookie("sessionToken")
      .redirect(`http://${process.env.URL}${process.env.APP_PORT}`);
  }
};

const magicLink = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(401)
      .json({ success: false, msg: "You must be registered first!" });

  const token = JWT.sign(
    { userId: user._id, roles: user.roles, email: user.email },
    process.env.JWT_SIGN,
    {
      expiresIn: 3600,
    }
  );
  const link = `http://${process.env.URL}${process.env.APP_PORT}/api/auth/login/${token}`;
  const subject = "Login in GameJam Support Platform";
  const message = `Hi, click on this link to continue to the app:`;
  await sendEmail(email, subject, message, link);
  res.status(200).json({
    success: true,
    msg: `Magic Link sent to user's email`,
    email,
    magicLink,
  });
};

// Esto lo estoy probando, es para verificar que exite una session abierta y
// salta el login
const verifyToken = async (req, res) => {
  const token = req.cookies.sessionToken;
  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SIGN);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Token is valid", userId: user._id });
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

const validateSession = (req, res, next) => {
  const token = validateToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: "Session not found" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SIGN);
    req.userPayLoad = {
      userId: decoded.userId,
      roles: decoded.roles,
      email: decoded.email,
    };
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Session not found" });
  }
};

const validateSupport = async (req, res, next) => {
  try {
    const userPayLoad = req.userPayLoad;
    const support = await Support.findOne({
      idUser: userPayLoad.userId,
    }).populate("supportCategories");
    if (!support) {
      return res.status(401).json({ success: false, error: "Not a support" });
    }
    req.userPayLoad = { ...userPayLoad, supportInfo: support };
    next();
  } catch {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error, try again" });
  }
};

const validateAdmin = (req, res, next) => {
  const token = validateToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: "Session not found" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SIGN);
    const rolesToCheck = ["GlobalOrganizer"];

    const hasValidRole = rolesToCheck.some((role) =>
      decoded.roles.includes(role)
    );

    if (!hasValidRole) {
      return res
        .status(403)
        .json({ success: false, error: "User not authorized" });
    }

    req.userPayLoad = {
      idUser: decoded.userId,
      roles: decoded.roles,
      email: decoded.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

const validateUser = (req, res, next) => {
  const token = validateToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: "Session not found" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SIGN);
    const rolesToCheck = [
      "GlobalOrganizer",
      "LocalOrganizer",
      "Judge",
      "Jammer",
    ];

    const hasValidRole = rolesToCheck.some((role) =>
      decoded.roles.includes(role)
    );

    if (!hasValidRole) {
      return res
        .status(403)
        .json({ success: false, error: "User not authorized" });
    }

    req.userPayLoad = {
      userId: decoded.userId,
      roles: decoded.roles,
      email: decoded.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

const validateToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return req.cookies.sessionToken;
};

const logOut = async (req, res) => {
  try {
    const token = req.cookies.sessionToken;

    res.clearCookie("sessionToken");

    if (!token) {
      return res
        .status(200)
        .json({ success: true, msg: "Logged out successfully" });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Logged out successfully" });
  } catch (error) {
    return res
      .clearCookie("sessionToken")
      .status(200)
      .json({ success: true, msg: "Logged out successfully" });
  }
};

/*ATTENTION, THIS IS FOR DEV*/
const getLoginLink = async (req, res) => {
  try {
    if (process.env.TARGET == "DEV") {
      const email = req.body.email;
      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(401)
          .json({ success: false, msg: "You must be registered first!" });

      const token = JWT.sign(
        { userId: user._id, roles: user.roles, email: user.email },
        process.env.JWT_SIGN,
        {
          expiresIn: 3600,
        }
      );
      const link = `http://${process.env.URL}${process.env.APP_PORT}/api/auth/login/${token}`;
      console.log(link);
      res.status(200).json({
        success: true,
        msg: `Magic Link sent to user's email`,
        email,
        link,
      });
    }
  } catch {
    res.status(500).json({ success: false, msg: "There has been an error" });
  }
};

async function mobileLogin(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select("_id roles email").lean();
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    if (user.roles.includes("Support")) {
      const supportInfo = await Support.findOne({
        userId: user.userId,
      }).populate("supportCategories");
      user.supportCategories = supportInfo ? supportInfo.supportCategories : [];
    }
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internet server error" });
  }
}

async function loginMobile(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const token = JWT.sign(
      { userId: user._id, roles: user.roles, email: user.email },
      process.env.JWT_SIGN,
      {
        expiresIn: 3600,
      }
    );
    const userRole = getUserRole(user);
    return res.status(201).json({ token: token, role: userRole });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
}

const getUserRole = (user) => {
  if (user.roles.includes("GlobalOrganizer")) {
    return "Global Organizer";
  } else if (user.roles.includes("Support")) {
    return "Support";
  } else {
    return "User";
  }
};

module.exports = {
  mobileLogin,
  login,
  verifyToken,
  magicLink,
  validateSession,
  validateSupport,
  validateUser,
  validateAdmin,
  logOut,
  getLoginLink,
  loginMobile,
};
