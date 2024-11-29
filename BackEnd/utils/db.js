const mongoose = require("mongoose");

//const URI = "mongodb://localhost:27017/mern";
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(0);
  }
};

module.exports = connectDb;