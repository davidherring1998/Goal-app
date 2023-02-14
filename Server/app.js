const express = require('express');
const config = require('dotenv').config();
const colors = require('colors');
const mongoDB = require('./config/index');

// initialize express
const app = express();
const PORT = process.env.PORT || 5001;
mongoDB()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, (err) => {
    if(!err){
        console.log(`Connected to port ${PORT}`);
    } else {
        console.log(`Connection failed: ${err}`);
    }
});