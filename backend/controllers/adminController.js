const User = require("../models/userModel");
const { format } = require("date-fns");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map((user) => {
      const userRole = getUserRole(user);
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        creationDate: format(user.creationDate, "dd/MM/yyyy"),
        role: userRole,
      };
    });

    return res.status(201).json(formattedUsers);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getUserRole = (user) => {
  if (user.roles.includes("GlobalOrganizer")) {
    return "Global Organizer";
  } else if (user.roles.includes("Support")) {
    return "Support";
  } else {
    return "User";
  }
};

module.exports = { getUsers };
