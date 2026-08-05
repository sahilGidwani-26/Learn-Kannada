const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "animals", "birds", "colors", "vegetables", "fruits", "family",
        "bodyParts", "school", "vehicles", "hospital", "market",
        "weather", "office", "travel", "food",
      ],
      required: true,
    },
    kannada: { type: String, required: true },
    hindi: { type: String, required: true },
    english: { type: String, required: true },
    imageUrl: { type: String },
    audioUrl: { type: String },
    exampleSentence: {
      kannada: String,
      hindi: String,
      english: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Word", wordSchema);
