const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a user
// POST
// /api/users/
const addUser = asyncHandler(async (req, res) => {
  // DECONSTRUCT NAME, EMAIL, PASSWORD FROM THE REQ.BODY
  const { name, email, password } = req.body;

  //VALIDATE THAT ALL INPUTS ARE GIVIN.
  if (!name || !email || !password) {
    res.status(400).json({ msg: `Please enter all required fields.` });
  }

  // CHECK IF USER EXIST BY CHECKING EMAIL SINCE IT IS UNIQUE IN MODEL
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({ msg: `User already exist with the email.` });
  }

  // HASH THE PASSWORD
  // GENERATE SALT, DEFAULT IS 10?
  const salt = await bcrypt.genSalt(10);
  // HASHED PASSWORD, TAKES IN PLAINTEXT PASSWORD AND THE SALT
  const hashedPassword = await bcrypt.hash(password, salt);

  // CREATE THE USER
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // CHECK IF USER WAS CREATED
  if (user) {
    res.status(201).json({
      msg: `User was created.`,
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error();
  }
});

// Login a user
// POST
// /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  // DECONSTRUCT EMAIL,PASSWORD FROM REQ.BODY
  const { email, password } = req.body;

  // FIND USER BY EMAIL
  const user = await User.findOne({ email });

  //MATCH USER PASSWORD
  // THE PASSWORD IN DB IS HASHED, SO USE BCRYPT.COMPARE TO HASH AND COMPARE
  // BCRYPT TAKES TO ARGUMENTS, PLAIN TEXT PASSWORD(PASSWORD) AND THE HASHED PASSWORD(USER.PASSWORD)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ msg: `Please enter the correct credentials.` });
    throw new Error();
  }
});

// GET user data
//  private
// api/users/me
// PROTECT ROUTES MY CREATING MIDDLEWARE
const getMe = asyncHandler(async (req, res) => {
  // REQ.USER.ID IS WHO EVER'S ID THAT HAS BEEN AUTHENTICATED
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Get all users for development
const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

// GENERATE TOKEN AND SET ID AS PAYLOAD
// JWT TAKES IN THE PAYLOAD(ID), SECRET, OPTIONS: EXPIRES IN 30D
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  addUser,
  loginUser,
  getMe,
  getAllUser,
};

// JSONWEBTOKEN => {
// NEEDS A SECRET
// CREATE FUNCTION TO GENERATE A TOKEN
// }
