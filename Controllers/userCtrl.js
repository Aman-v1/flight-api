const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');
const HttpError = require('../utils/httpError');

// @descr  Register user
// @route  Post /api/users/register
// @access Private

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw error
    throw new HttpError(409, 'User already exists');
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: 'success',
    message: 'User Registered Successfully',
    data: user,
  });
});

// @descr  Login user
// @route  Post /api/users/login
// @access Public

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: 'success',
      message: 'User logged in successfuly',
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new HttpError(401, 'Invalid login credentials');
  }
});

// @descr  Get user profile
// @route  GET /api/users/profile
// @access Private

exports.getUserProfile = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId);
  res.json({
    status: 'success',
    message: 'User profile fetched successfully',
    user,
  });
});
