const router = require("express").Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require("../Controllers/goals");
const { protect } = require("../Middleware/auth");

// router.route("/").get(protect, getGoals);
// router.route("/").post(addGoal);
// router.route("/:id").put(updateGoal);
// router.route("/:id").delete(deleteGoal);

router.get("/", protect, getGoals);
router.post("/", protect, addGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;
