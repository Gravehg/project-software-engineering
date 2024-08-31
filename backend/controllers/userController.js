const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const getAssignedTickets = async (req, res) => {
  try {
    const userPayLoad = req.userPayLoad;
    const supportPayLoad = userPayLoad.supportInfo;
    const tickets = await Ticket.find({
      idSupport: supportPayLoad._id,
    })
      .sort({ creationDate: -1 })
      .exec();
    const user = await User.findById(supportPayLoad.idUser);
    const ticketsWithUserName = tickets.map((ticket) => ({
      ...ticket.toObject(),
      userName: user.name,
    }));
    return res.status(200).json(ticketsWithUserName);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getUserCategories = (req, res) => {
  const userPayLoad = req.userPayLoad;
  const supportPayLoad = userPayLoad.supportInfo;
  const supportCategories = supportPayLoad.supportCategories;
  const r_categories = supportCategories.map((category) => {
    const { __v, ...rest } = category.toObject();
    return rest;
  });
  return res.status(201).json(r_categories);
};

module.exports = { getAssignedTickets, getUserCategories };