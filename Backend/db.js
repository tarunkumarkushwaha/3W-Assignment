const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    mongoose.set('sanitizeFilter', true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB Atlass");
  } catch (err) {
    console.error("MongoDB connection errorr:", err);
    process.exit(1);
  }
}

module.exports = connectDB;

