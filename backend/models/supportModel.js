const mongoose = require("mongoose");
const { Schema } = mongoose;

const supportSchema = new Schema({
  category: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("Support", supportSchema);
