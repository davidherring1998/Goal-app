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
mongoDB()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.use(errHandler);

app.listen(PORT, (err) => {
    if(!err){
        console.log(`Connected to port ${PORT}`);
    } else {
        console.log(`Connection failed: ${err}`);
    }
});