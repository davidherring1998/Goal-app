const asyncHandler = require("express-async-handler");
const Goal = require("../Models/Goal");
const User = require("../Models/User");

// GET goals
// api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.json(goals);
});

// POST goal
// api/goals
const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ msg: `Please add a text field.` });
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// PUT goal
// /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ msg: `Goal does not exist.` });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error(`User not found.`);
  }

  // CHECK LOGGED IN USER MATCHES GOAL USER
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error(`User not authorized.`);
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(goal);
});

// DELETE GOAL
// /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ msg: `Goal does not exist.` });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error(`User not found.`);
  }

  // CHECK LOGGED IN USER MATCHES GOAL USER
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error(`User not authorized.`);
  }

  await Goal.findByIdAndRemove(req.params.id);
  res.status(200).json({ msg: `Goal deleted.` });
});

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
