const mongoose = require("mongoose");

const alphabetSchema = new mongoose.Schema(
  {
    kannada: { type: String, required: true },
    type: { type: String, enum: ["vowel", "consonant"], required: true },
    englishTransliteration: { type: String, required: true },
    hindiMeaning: { type: String },
    audioUrl: { type: String },
    strokeAnimationUrl: { type: String },
    exampleWord: {
      kannada: String,
      hindi: String,
      english: String,
      imageUrl: String,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alphabet", alphabetSchema);
