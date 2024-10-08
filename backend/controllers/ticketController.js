const Ticket = require("../models/ticketModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

//Crea el tickete de manera completa, añadiendo su chat correspondiente y su primer mensaje.
const addTicket = async (req, res) => {
  try {
    const userID = req.userPayLoad.userId;
    const newTicket = new Ticket({
      idUserIssued: userID,
      resolutionState: "Not resolved",
      closureState: "Open",
      category: req.body.category,
      topic: req.body.topic,
      creationDate: new Date(),
    });
    newTicket.save().then((nTicket) => {
      addNewChat(nTicket._id, userID, req.body.text);
    });
    return res
      .status(201)
      .json({ success: true, msg: "Created category successfully" });
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error, try again" });
  }
};
//Función encargada de agregar un chat nuevo
function addNewChat(idTicket, idUserIssued, idText) {
  const newChat = new Chat({
    idTicket: idTicket,
  });
  newChat.save().then((nChat) => {
    addMessage(nChat._id, idUserIssued, idText);
  });
}
//Funcion encargada de agregar cualquier mensaje
function addMessage(nIdChat, nIdUser, idText) {
  const newMessage = new Message({
    idChat: nIdChat,
    idUser: nIdUser,
    text: idText,
    remitent: "Jammer",
    textDate: new Date(),
  });
  newMessage.save();
}

const getTicketById = async (req, res) => {
  try {
    const ticketID = req.query.ticketID;
    const ticket = await Ticket.findById(ticketID)
      .populate("idUserIssued")
      .populate("idSupport")
      .exec();
    if (!ticket) {
      return res.status(404).json({ success: false, msg: "Ticket not found." });
    }
    const ticketData = {
      _id: ticket._id,
      idUserIssued: ticket.idUserIssued._id,
      userName: ticket.idUserIssued.name,
      idSupport: ticket.idSupport ? ticket.idSupport._id : null,
      supportName: ticket.idSupport ? ticket.idSupport.name : null,
      resolutionState: ticket.resolutionState,
      closureState: ticket.closureState,
      topic: ticket.topic,
    };
    return res.status(200).json({ success: true, ticket: ticketData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "There have been an error while trying to get the Ticket",
    });
  }
};

const updateClosureState = async (req, res) => {
  try {
    const { ticketID, newClosureState } = req.body;
    if (!ticketID || !newClosureState) {
      return res.status(400).json({
        success: false,
        msg: "ticketID and newClosureState are required",
      });
    }
    const result = await Ticket.updateOne(
      { _id: ticketID },
      { $set: { closureState: newClosureState } }
    );

    if (result.modifiedCount > 0) {
      return res
        .status(200)
        .json({ success: true, msg: "closureState updated" });
    } else {
      return res.status(404).json({ success: false, msg: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return res.status(500).json({
      success: false,
      msg: "There have been an error while changing closureState",
    });
  }
};

const updateResolutionState = async (req, res) => {
  try {
    const { ticketID, newResolutionState } = req.body;
    if (!ticketID || !newResolutionState) {
      return res.status(400).json({
        success: false,
        msg: "ticketID and newResolutionState are required",
      });
    }
    const result = await Ticket.updateOne(
      { _id: ticketID },
      { $set: { resolutionState: newResolutionState } }
    );

    if (result.modifiedCount > 0) {
      return res
        .status(200)
        .json({ success: true, msg: "resolutionState updated" });
    } else {
      return res.status(404).json({ success: false, msg: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return res.status(500).json({
      success: false,
      msg: "There have been an error while changing resolutionState",
    });
  }
};

const updateAssignedSupp = async (req, res) => {
  try {
    const { ticketID } = req.body;
    if (!ticketID) {
      return res.status(400).json({
        success: false,
        msg: "ticketID is required",
      });
    }
    const result = await Ticket.updateOne(
      { _id: ticketID },
      { $set: { idSupport: null } }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({ success: true, msg: "idSupport updated" });
    } else {
      return res.status(404).json({ success: false, msg: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return res.status(500).json({
      success: false,
      msg: "There have been an error while changing idSupport",
    });
  }
};

const getSuppTicketById = async (req, res) => {
  try {
    const ticketID = req.query.ticketID;
    const ticket = await Ticket.findById(ticketID)
      .populate("idUserIssued")
      .populate("idSupport")
      .populate("category")
      .exec();
    if (!ticket) {
      return res.status(404).json({ success: false, msg: "Ticket not found." });
    }
    const ticketData = {
      _id: ticket._id,
      idUserIssued: ticket.idUserIssued._id,
      userName: ticket.idUserIssued.name,
      idSupport: ticket.idSupport ? ticket.idSupport._id : "Not assigned",
      supportName: ticket.idSupport ? ticket.idSupport.name : "Not assigned",
      idCategory: ticket.category._id,
      categoryName: ticket.category.name,
      resolutionState: ticket.resolutionState,
      closureState: ticket.closureState,
      topic: ticket.topic,
    };
    return res.status(200).json({ success: true, ticket: ticketData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "There have been an error while trying to get the Ticket",error
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { ticketID, newCategory } = req.body;
    if (!ticketID || !newCategory) {
      return res.status(400).json({
        success: false,
        msg: "ticketID and new category are required",
      });
    }
    const result = await Ticket.updateOne(
      { _id: ticketID },
      { $set: { category: newCategory } }
    );
    if (result.modifiedCount > 0) {
      return res.status(200).json({ success: true, msg: "category updated" });
    } else {
      return res.status(404).json({ success: false, msg: "Ticket not found" });
    }
  } catch (error) {
    console.error("Error al actualizar category:", error);
    return res.status(500).json({
      success: false,
      msg: "There have been an error while changing category",
    });
  }
};







module.exports = {
  getTicketById,
  updateClosureState,
  addTicket,
  updateResolutionState,
  updateAssignedSupp,
  getSuppTicketById,
  updateCategory,
};
