import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import matchPassword from "../utils/matchPassword.js";
import jwt from "jsonwebtoken";
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(401);
    throw new Error("User Do Not Exists!");
  }

  const authenticatePassword = await matchPassword(
    password,
    userExists.password
  );
  if (authenticatePassword) {
    res.cookie("user", generateToken(userExists._id), {
      
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'None', 
      path: '/', 
    });
    res.status(201).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    });
  } else {
    res.status(401);
    throw new Error("Password do not match");
  }
});


const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.cookie("user", generateToken(user._id), {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'None', 
      path: '/', 
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("user", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getUser = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const updateUser = asyncHandler(async (req, res) => {
    
  const user = await User.findById(req.user._id);

    
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
    
        if (req.body.password) {
          user.password = req.body.password;
        }
    
        const updatedUser = await user.save();
    
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
});

export { authUser, registerUser, logOutUser, getUser, updateUser };
