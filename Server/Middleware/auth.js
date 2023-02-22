const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/User');

const protect = asyncHandler(async (req, res, next) => {
    // INITIALIZE TOKEN VARIABLE
    let token;

    // CHECK FOR AUTHORIZATION HEADER AND STARTS WITH 'BEARER'
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // GET TOKEN FROM HEADER
            const token = req.headers.authorization.split(' ');

            // VERIFY TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password')

            next();

        } catch(err) {
            console.log(err)
            res.status(401)
            throw new Error; 
        }
    }
})

module.exports = protect;