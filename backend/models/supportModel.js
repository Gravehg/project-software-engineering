const mongoose = require("mongoose");
const { Schema } = mongoose;

const supportSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Support", supportSchema);
