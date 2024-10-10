const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Support = require("../models/supportModel");
const { sendEmail } = require("../services/mailer");

const sendMessage = async (req, res) => {
  try {
    const { idChat, idUser, idSupport, text, remitent } = req.body;
    if (!idChat || !idUser || !text || !remitent) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }
    const newMessage = new Message({
      idChat,
      idUser,
      idSupport,
      text,
      textDate: new Date(),
      remitent,
    });

    //Send email logic, we could extract it into its own method
    const chat = await Chat.findOne({ _id: idChat });
    const user = await User.findOne({ _id: idUser });
    const ticket = await Ticket.findById(chat.idTicket);

    /*ATTENTION THIS IS FOR DEVELOPING PURPOSES */
    if (process.env.TARGET != "DEV") {
      if (remitent === "Support") {
        const subject = `Ticket ${chat.idTicket}`;
        const message = "You have a new answer on your ticket!";
        const link = `http://${process.env.URL}${process.env.APP_PORT}/jammers-users/chat-jammer/${chat.idTicket}`;
        await sendEmail(user.email, subject, message, link);
      } else {
        if (ticket && ticket.idSupport) {
          const supp = await Support.findOne({ _id: ticket.idSupport });
          const userSup = await User.findById(supp.idUser);
          const subject = `Ticket ${chat.idTicket}`;
          const message = "You have a new answer on your ticket!";
          const link = `http://${process.env.URL}${process.env.APP_PORT}/ticket-chat/${chat.idTicket}`;
          await sendEmail(userSup.email, subject, message, link);
        }
      }
    }

    await newMessage.save();
    return res.status(201).json({
      success: true,
      msg: "Message sent successfully",
      message: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "There has been an error",
      error: error.message,
    });
  }
};

module.exports = { sendMessage };
