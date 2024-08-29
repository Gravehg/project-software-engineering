const mongoose = require("mongoose");
const { Schema } = mongoose;
const chatModelSchema = new Schema({
    id_ticket: {
        type: String,
        required: true,
      },
  });

module.exports = mongoose.model("Chat", chatModelSchema);