const Message = require("../models/messageModel");
const chats = require('../models/chatModel');

const getMessages = async (req, res) => {
  try {
    const chatID = req.query.chatID;
    const messages = await Message.find({ idChat: chatID })
      .populate("idUser", "name") 
      .populate("idSupport", "name") 
      .sort({ textDate: 1 })
      .exec();
    const formattedMessages = messages.map((msg) => ({
      idChat: msg.idChat,
      idUser: msg.idUser._id, 
      userName: msg.idUser.name, 
      idSupport: msg.idSupport?._id || null, 
      supportName: msg.idSupport?.name || null, 
      text: msg.text, 
      textDate: msg.textDate, 
      remitent: msg.remitent,
    }));

    return res.status(200).json(formattedMessages);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};



const getChatID = async (req, res) => {
  try {
    const ticketID = req.query.ticketID;
    const chat = await chats.findOne({ idTicket: ticketID }).exec(); 
    if (!chat) {
      return res.status(404).json({ success: false, msg: 'No chat has been found.' });
    }
    return res.status(200).json({ success: true, chatID: chat._id });
  } catch (error) {
    console.error('Error fetching chat:', error);
    return res.status(500).json({ success: false, msg: 'There has been an error.' });
  }
};

module.exports = { getMessages,getChatID};