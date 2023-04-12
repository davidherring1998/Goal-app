const router = require("express").Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require("../Controllers/goals");
const { protect } = require("../Middleware/auth");

router.get("/", getGoals);
router.post("/", addGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;
