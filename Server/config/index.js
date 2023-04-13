const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://David_Herring:Bear.123@cluster01.ozf1uqy.mongodb.net/MERNapp?retryWrites=true&w=majority"
    );
    console.log(`Connected to MongoDB ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Connection failed. ${err}`.underline);
    process.exit(1);
  }
};

module.exports = connectDB;
