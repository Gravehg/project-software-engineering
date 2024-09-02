const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  idChat: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  idSupport: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  textDate: {
    type: Date,
    required: true,
  },
  remitent: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);