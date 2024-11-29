const bcrypt = require("bcrypt");
const User = require("../model/user-model");

// Home Logic
const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
  };
  
// Registration Logic
const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
  
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }
  
    const userCreated = await User.create({ username, email, phone, password });
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
    console.log("Registration succesful");
  
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


//* Login Logic 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      console.log("User not found with email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (isPasswordCorrect) {
      const token = await userExist.generateToken();
      res.status(200).json({
        message: "Login Successful",
        token: token,
        userId: userExist._id.toString(),
      });
      console.log("Login successful");
    } else {
      console.log("Password mismatch for email:", email);
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// User Logic

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login , user };