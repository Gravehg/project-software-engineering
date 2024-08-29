const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  idUserIssued: {
    type: String,
    required: true,
  },
  idSupport: {
    type: Schema.Types.ObjectId,
    ref: "Support",
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
  creationDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
