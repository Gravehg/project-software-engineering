const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageModelSchema = new Schema({
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
        required: false,
      },
    dateHour:{
      type: String,
      required: false,
    },
  });

module.exports = mongoose.model("Message", messageModelSchema);