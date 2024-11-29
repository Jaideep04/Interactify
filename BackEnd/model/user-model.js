const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure the password with the bcrypt
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) { // Corrected check here
      return next();
    }
  
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, saltRound);
      user.password = hashedPassword;
      next(); // Ensure next() is called after hashing
    } catch (error) {
      console.error("Error in password hashing:", error); // Log the error
      return next(error);
    }
});

// Generate JSON Web Token
userSchema.methods.generateToken = async function () {
  console.log("Token generated succesfully");
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d"
      }
    );
  } catch (error) {
    console.error("Token Error: ", error);
  }
};
  
// Define the model or the collection name
const User = mongoose.model("USER", userSchema);

module.exports = User;

