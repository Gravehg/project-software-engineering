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
      .populate("idUserIssued")
      .exec();

    const ticketsWithUserName = tickets.map((item) => ({
      _id: item._id,
      userName: item.idUserIssued.name,
      category: item.category,
      topic: item.topic,
      creationDate: item.creationDate,
      closureState: item.closureState,
      resolutionState: item.resolutionState,
    }));

    return res.status(200).json(ticketsWithUserName);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getSupportCategories = (req, res) => {
  try {
    const userPayLoad = req.userPayLoad;
    const supportPayLoad = userPayLoad.supportInfo;
    const supportCategories = supportPayLoad.supportCategories;
    const r_categories = supportCategories.map((category) => {
      const { __v, ...rest } = category.toObject();
      return rest;
    });
    return res.status(201).json(r_categories);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getSupportTicketPool = async (req, res) => {
  try {
    const userPayLoad = req.userPayLoad;
    const supportPayLoad = userPayLoad.supportInfo;
    const categories = supportPayLoad.supportCategories.map((category) => ({
      ...category.toObject(),
      _id: category._id.toString(),
    }));

    const categoryIds = categories.map((category) => category._id);
    const tickets = await Ticket.find({
      category: { $in: categoryIds },
      $or: [{ idSupport: { $exists: false } }, { idSupport: null }],
    })
      .sort({ creationDate: -1 })
      .populate("idUserIssued")
      .exec();

    const ticketsWithUserName = tickets.map((item) => ({
      _id: item._id,
      userName: item.idUserIssued.name,
      category: item.category,
      topic: item.topic,
      creationDate: item.creationDate,
      closureState: item.closureState,
      resolutionState: item.resolutionState,
    }));

    return res.status(200).json(ticketsWithUserName);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

module.exports = {
  getAssignedTickets,
  getSupportCategories,
  getSupportTicketPool,
};
