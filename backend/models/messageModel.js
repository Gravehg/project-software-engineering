const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  idChat: {
    type: String,
    required: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idSupport: {
    type: Schema.Types.ObjectId,
    ref: "Support",
    required: false,
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
