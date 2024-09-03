const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  idUserIssued: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idSupport: {
    type: Schema.Types.ObjectId,
    ref: "Support",
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
    type: Schema.Types.ObjectId,
    ref: "SupportCategory",
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