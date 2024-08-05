const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/userModel.js");

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid username or password");
  }
  generateToken(res, user._id);
  res.json({
    success: true,
    message: "Login successfull",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = new User({
    username,
    email,
    password,
  });

  await user.save();

  if (user) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { registerUser, authUser };
