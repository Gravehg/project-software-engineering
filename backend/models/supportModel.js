const mongoose = require("mongoose");
const { Schema } = mongoose;

const supportSchema = new Schema({
  idUser: { type: String, required: true },
  name: { type: String, required: true }, //solo agregue este atributo
  supportCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "SupportCategory",
    },
  ],
});

module.exports = mongoose.model("Support", supportSchema);
