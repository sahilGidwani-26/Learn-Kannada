const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");

// @desc   Register new user
// @route  POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, ageGroup } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const user = await User.create({ name, email, password, ageGroup });

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      coins: user.coins,
      level: user.level,
      quizLevel: user.quizLevel,
    },
    token: generateToken(user._id),
  });
});

// @desc   Login user
// @route  POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      coins: user.coins,
      level: user.level,
      quizLevel: user.quizLevel,
    },
    token: generateToken(user._id),
  });
});

// @desc   Get logged in user's profile
// @route  GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

// @desc   Forgot password - generates a reset token (email sending to be wired up later)
// @route  POST /api/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("No account found with this email");
  }
  // TODO: integrate an email/OTP provider (e.g. Nodemailer, Twilio) to actually deliver the OTP
  res.json({ success: true, message: "OTP sent to your registered email (integration pending)" });
});

module.exports = { registerUser, loginUser, getMe, forgotPassword };