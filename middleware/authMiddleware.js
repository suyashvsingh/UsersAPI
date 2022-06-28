const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const auth = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400);
    throw new Error("Enter jwt");
  }
  if (!req.headers.authorization.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Enter valid jwt");
  }
  const token = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(400);
    throw new Error("User might have been deleted");
  }
  req.user = user;
  next();
});

module.exports = { auth };
