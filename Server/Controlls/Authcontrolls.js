const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv").config();

// Register Validation
const registerValidate = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: true, msg: "This email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name, email, password: hashedPassword });

    res.status(201).json({ msg: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: "Error registering user", error });
  }
};

// Login Validation
const loginValidate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No record existed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: true, msg: "The password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.myToken || "defaultSecretKey", { expiresIn: "1d" });
     res.status(200).json({ msg: "Success", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};  




module.exports = { registerValidate, loginValidate};
