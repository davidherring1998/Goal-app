const router = require("express").Router();
const {
  addUser,
  loginUser,
  getMe,
  getAllUser,
} = require("../Controllers/users");
const { protect } = require("../Middleware/auth");

router.route("/").post(addUser);
router.route("/login").post(loginUser);
router.route("/me", protect).get(getMe);
router.route("/all").get(getAllUser);

module.exports = router;
