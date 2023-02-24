const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // GETTING TOKEN FROM HEADER
      // REMEMBER BEARER TOKEN HERE
      token = req.headers.authorization.split(" ")[1];
      //  VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //FINDING USER BY THE ID PAYLOAD
      // WON'T INCLUDE THE PASSWORD BECAUSE OF SELECT('-PASSWORD')
      req.user = await User.findById(decoded.id).select("-password");

      next();
      
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error(`Not Authorized.`);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(`Not Authorized, no token present.`);
  }
});

module.exports = { protect };
// INSTRUCTIONS:
// BRING IN PACKAGES AND MODEL
// CREATE A FUNCTION THAT TAKES IN REQ, RES, NEXT
// INIT A VARIABLE NAMES TOKEN
// CHECK AUTHORIZATION HEADER IS THERE AND STARTS WITH 'BEARER' (STARTSWITH())
// GET TOKEN FROM HEADER REQ.HEADERS.AUTHORIZATION.SPLIT(' ') <= TURNS INTO AN ARRAY AND SPLITS BY THE SPACE
// VERIFY TOKEN DECODED = JTW.VERIFY(TAKES TOKEN, TAKES SECRET)
// GET USER FROM THE TOKEN AND ASSIGN IT TO REQ.USER SO IT IS ACCESS ABLE  TO ANY ROUTE THAT IS PROTECTED
// FIND BY ID (DECODED.PAYLOAD).SELECT('-PASSWORD') <= SELECT DOES NOT INCLUDE PASSWORD
// MAKE SURE TO CALL NEXT BECAUSE IT IS MIDDLEWARE
// ERROR 401 MEANS NOT AUTHORIZED
//
