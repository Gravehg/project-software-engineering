const Ticket = require("../models/ticketModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

//Crea el tickete de manera completa, añadiendo su chat correspondiente y su primer mensaje.
const addTicket = async (req, res) => {
  console.log("mensaje addticket");
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
    addNewChat(nTicket._id, userID, "" /*'idSupport'*/, req.body.text);
  });
  return res
    .status(201)
    .json({ success: true, msg: "Created category successfully" });
};
//Función encargada de agregar un chat nuevo
function addNewChat(idTicket, idUserIssued, idSupport, idText) {
  const newChat = new Chat({
    id_ticket: idTicket,
  });
  newChat.save().then((nChat) => {
    addMessage(nChat._id, idUserIssued, idSupport, idText);
    console.log("mensaje", idText);
  });
}
//Funcion encargada de agregar cualquier mensaje
function addMessage(nIdChat, nIdUser, nIdSupport, idText) {
  const newMessage = new Message({
    idChat: nIdChat,
    idUser: nIdUser,
    idSupport: nIdSupport,
    text: idText,
    remitent: "Jammer",
    dateHour: new Date(),
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
      idSupport: ticket.idSupport._id,
      supportName: ticket.idSupport.name,
      resolutionState: ticket.resolutionState,
      closureState: ticket.closureState,
      topic: ticket.topic,
    };
    return res.status(200).json({ success: true, ticket: ticketData });
  } catch (error) {
    console.error("Error al obtener el ticket:", error);
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
module.exports = { getTicketById, updateClosureState, addTicket };
