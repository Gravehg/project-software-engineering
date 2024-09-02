const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  idTicket: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
