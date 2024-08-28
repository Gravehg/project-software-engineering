const mongoose = require("mongoose");
const { Schema } = mongoose;

const supportCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SupportCategory", supportCategorySchema);
