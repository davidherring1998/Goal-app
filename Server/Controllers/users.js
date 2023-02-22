const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a user
// POST
// /api/users/
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check that all required data is present
  if (!name || !email || !password) {
    res.status(400).json({ msg: `Please enter all text fields.` });
  }

  // check if user exist
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400).json({ msg: `User already exist.` });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    token: generateToken(user.id),
  });

  // send back 201 response
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ msg: `Failed, User not created.` });
  }
});

// Login a user
// POST
// /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ msg: `Failed, invalid credentials ` });
  }
});
// Get user data
// GET // private
// api/users/me
const getMe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json(user);
});

// generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

module.exports = {
  addUser,
  loginUser,
  getMe,
  getAllUser,
};
