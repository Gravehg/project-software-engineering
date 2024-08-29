const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  idUserIssued: {
    type: String,
    required: true,
  },
  idSupport: {
    type: String,
    required: false,
  },
  resolutionState: {
    type: String,
    required: true,
  },
  closureState: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);