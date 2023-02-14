const asyncHandler = require('express-async-handler');
const Goal = require('../Models/Goal');

// GET goals
// api/goals
const getGoals = asyncHandler (async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

// POST goal
// api/goals
const addGoal = asyncHandler( async (req, res) => {
    if(!req.body.text){
        res.status(400).json({msg: `Please add a text field.`})
    }

    const goal = await Goal.create({text: req.body.text});
    res.status(201).json(goal);
});

// PUT goal
// /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400).json({msg: `Goal does not exist.`})
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(goal);
});

// DELETE GOAL
// /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400).json({msg: `Goal does not exist.`})
    }

    await Goal.findByIdAndRemove(req.params.id)
    res.status(200).json({msg:`Goal deleted.`})
});

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
}