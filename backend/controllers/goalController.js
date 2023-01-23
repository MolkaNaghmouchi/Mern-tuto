const asyncHandler = require('express-async-handler')
// @desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async(req, res) => {
  res.status(200).json({ message: 'Get goals' })
})
// @desc Set goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async(req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text filed");
  }

  res.status(200).json({ message: "set goal " });
})
// @desc UPDATE goals
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler((req, res) => {
  res.status(200).json({ message: `update  goals ${req.params.id}` });
})
// @desc DELETE goals
//@route DELETE/api/goals
//@access Private
const deleteGoal = asyncHandler( (req, res) => {
  res.status(200).json({ message: `delete goals ${req.params.id}` });
})
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
