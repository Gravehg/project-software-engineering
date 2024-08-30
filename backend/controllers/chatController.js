const Message = require("../models/messageModel");

const getMessages = async (req, res) => {
  try {
    const chatID = req.body.chatID;
    const messages = await Message.find({
      idChat: chatID,
    })
      .sort({ textDate: -1 })
      .exec();
    return res.status(200).json(messages);
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "There has been an error" });
  }
};

const getChatID = async (req, res) => {
  try {
    const ticketID = req.body.ticketID; 
    const chat = await Chat.findOne({ idTicket: ticketID }).exec(); 
    if (!chat) {
      return res.status(404).json({ success: false, msg: 'Chat not found' });
    }
    return res.status(200).json({ success: true, chatID: chat.chatID });
  } catch (error) {
    return res.status(500).json({ success: false, msg: 'There has been an error' });
  }
};



module.exports = { getMessages, getChatID };