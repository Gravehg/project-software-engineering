const { text } = require("express");
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
    textDate:{
      type: Date,
      required: false,
    },
    text:{
      type: String,
    },    
    remitent:{
      type: String,
    },
  });

module.exports = mongoose.model("Message", messageModelSchema);