const mongoose = require("mongoose");
const { Schema } = mongoose;

const supportSchema = new Schema({
  idUser: { type: string, required: true },
  roles: [String],
  name: String,
});

module.exports = mongoose.model("Support", supportSchema);
