const express = require('express');
const config = require('dotenv').config();
const colors = require('colors');
const errHandler = require('./Middleware/error');
const mongoDB = require('./config/index');
const goalRoutes = require('./Routes/goals');
const userRoutes = require('./Routes/users');

// initialize express
const app = express();
const PORT = process.env.PORT || 5001;
mongoDB();

// middleware
// parses incoming request with json payloads
app.use(express.json());
// parses incoming request with urlencoded payloads
app.use(express.urlencoded({extended: false}));
// err handler
app.use(errHandler);
// routes
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, (err) => {
    if(!err){
        console.log(`Connected to port ${PORT}`);
    } else {
        console.log(`Connection failed: ${err}`);
    }
});