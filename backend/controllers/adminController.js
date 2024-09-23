const User = require("../models/userModel");
const Support = require("../models/supportModel");

const getExistingUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).exec();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getExistingSupports = async (req, res) => {
  try {
    const supports = await Support.find().exec();
    return res.status(200).json(supports);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};


module.exports = { getExistingUsers, getExistingSupports };