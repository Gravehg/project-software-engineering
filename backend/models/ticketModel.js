const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  id_user_issued: {
    type: String,
    required: true,
  },
  id_support: {
    type: String,
    required: false,
  },
  resolution_state: {
    type: String,
    required: true,
  },
  closure_state: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
