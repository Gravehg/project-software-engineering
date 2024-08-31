const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .sort({ creationDate: -1 })
      .populate("idUserIssued")
      .populate("idSupport")
      .exec();

    const ticketsWithDetails = tickets.map((item) => ({
      _id: item._id,
      userName: item.idUserIssued.name,
      supportName: item.idSupport ? item.idSupport.name : 'No asignado',
      category: item.category,
      topic: item.topic,
      creationDate: item.creationDate,
      closureState: item.closureState,
      resolutionState: item.resolutionState,
    }));

    return res.status(200).json(ticketsWithDetails);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Ha ocurrido un error", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Ticket.distinct("category");
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Ha ocurrido un error al obtener las categorías", error: error.message });
  }
};

const getTicketPool = async (req, res) => {
  try {
    const tickets = await Ticket.find({
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
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Ha ocurrido un error al obtener el pool de tickets", error: error.message });
  }
};

module.exports = {
  getAllTickets,
  getAllCategories,
  getTicketPool,
};