const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    module: { type: String, enum: ["alphabets", "numbers", "words", "sentences", "writing"], required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId },
    completed: { type: Boolean, default: false },
    accuracy: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    lastAttemptAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
