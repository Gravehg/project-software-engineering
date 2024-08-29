const Ticket = require("../models/ticketModel");

const getAssignedTickets = async (req, res) => {
  console.log(req.userPayLoad);
  try {
    const userPayLoad = req.userPayLoad;
    const supportPayLoad = userPayLoad.supportInfo;
    const tickets = await Ticket.find({ idSupport: supportPayLoad._id });
    return res.status(200).json(tickets);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getSupportCategories = (req, res) => {
  const userPayLoad = req.userPayLoad;
  const supportPayLoad = userPayLoad.supportInfo;
  const supportCategories = supportPayLoad.supportCategories;
  const r_categories = supportCategories.map((category) => {
    const { __v, ...rest } = category.toObject();
    return rest;
  });
  return res.status(201).json(r_categories);
};

module.exports = { getAssignedTickets, getSupportCategories };
