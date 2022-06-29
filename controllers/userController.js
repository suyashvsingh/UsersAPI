const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//GET
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter both the fields");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return res
      .status(200)
      .json({ msg: "successfully logged-in", token: generateToken(user._id) });
  }
  res.status(401);
  throw new Error("Invalid credentials");
});

//POST
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter all fields");
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password: await hashedPassword(password),
  });
  const userID = user._id;
  res.status(201).json({
    msg: "posted successfully",
    token: generateToken(userID),
  });
});

//PUT
const updateUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, req.body);
  res.status(201).json({ msg: "user updated", user: await User.findById(id) });
});

//DELETE
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndDelete(id);
  res.status(201).json({ msg: "user deleted" });
});

const hashedPassword = asyncHandler(async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { login, createUser, updateUserInfo, deleteUser };
