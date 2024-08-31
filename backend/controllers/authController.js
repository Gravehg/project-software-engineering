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
      maxAge: 1000 * 60 * 30,
    });

    if (roles.includes("GlobalOrganizer")) {
      return res.redirect(
        `http://${process.env.URL}${process.env.APP_PORT}/tickets-pool`
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
  const token = req.cookies.sessionToken;
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

const validateAdmin = async (req, res, next) => {
  try {
    const userPayLoad = req.userPayLoad;
    const user = await User.findById(userPayLoad.userId);
    if (!user || !user.roles.includes("Admin")) {
      return res.status(403).json({ success: false, error: "Not authorized as admin" });
    }
    req.userPayLoad = { ...userPayLoad, adminInfo: { isAdmin: true } };
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error, try again" });
  }
};

module.exports = {
  login,
  verifyToken,
  magicLink,
  validateSession,
  validateSupport,
  validateAdmin,
};
