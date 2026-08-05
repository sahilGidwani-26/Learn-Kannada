const asyncHandler = require("../utils/asyncHandler");
const History = require("../models/History");

// @desc   Get scan/translation/AI chat history for logged-in user
// @route  GET /api/history
const getHistory = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const filter = { user: req.user._id, ...(type ? { type } : {}) };
  const history = await History.find(filter).sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, data: history });
});

module.exports = { getHistory };
