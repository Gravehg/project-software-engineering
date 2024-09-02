const Message = require("../models/messageModel");

const sendMessage = async (req, res) => {
    try {
      const { idChat, idUser, idSupport, text, remitent } = req.body;
      if (!idChat || !idUser || !idSupport || !text || !remitent) {
        return res.status(400).json({ success: false, msg: 'All fields are required' });
      }
      const newMessage = new Message({
        idChat,
        idUser,
        idSupport,
        text,
        textDate: new Date(),
        remitent
      });
      await newMessage.save();
      return res.status(201).json({ success: true, msg: 'Message sent successfully', message: newMessage });
    } catch (error) {
      return res.status(500).json({ success: false, msg: 'There has been an error', error: error.message });
    }
  };

  module.exports = { sendMessage };