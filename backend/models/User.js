const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    phone: { type: String, trim: true },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["student", "parent", "admin"], default: "student" },
    ageGroup: { type: String, enum: ["kid", "teen", "adult"], default: "adult" },
    preferredLanguage: { type: String, enum: ["hindi", "english"], default: "english" },
    xp: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    quizLevel: { type: Number, default: 1, min: 1, max: 100 }, // progress through the 100-level learning game
    badges: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    parentEmail: { type: String, default: null }, // links kid account to a parent dashboard
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);