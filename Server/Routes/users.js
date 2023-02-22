const router = require("express").Router();
const {
  addUser,
  loginUser,
  getMe,
  getAllUser,
} = require("../Controllers/users");
const { protect } = require("../Middleware/auth");

router.post("/", addUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/all", getAllUser);

module.exports = router;
