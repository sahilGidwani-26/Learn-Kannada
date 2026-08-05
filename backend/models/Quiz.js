const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizType: {
      type: String,
      enum: ["letter", "number", "word", "voice", "image", "translation", "sentence"],
      required: true,
    },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    xpEarned: { type: Number, default: 0 },
    coinsEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
