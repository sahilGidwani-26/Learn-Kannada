const mongoose = require("mongoose");

const numberSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true, unique: true },
    kannada: { type: String, required: true },
    englishTransliteration: { type: String, required: true },
    hindiMeaning: { type: String },
    audioUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NumberItem", numberSchema);
