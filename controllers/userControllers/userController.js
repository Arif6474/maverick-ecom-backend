import User from "#models/userModels/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const { genSalt, hash, compare } = bcrypt
const { verify } = jwt
import { generateToken } from '#utils/helperFunction.js'
import { sendForgotPasswordMail } from "#config/email/emailFormats/sendMail.js";

import {
  archiveDocument,
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentsWithQuery,
  getSingleDocument,
  updateDocument
} from '#crudServices/crudServices.js';
import asyncHandler from 'express-async-handler';

const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword } = req.body;

    if (!name || !phone || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      image: user.image,
      address: user.address,
      bio: user.bio,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateToken(user._id);
    const resetLink = `${process.env.CONSUMER_APP_LINK}/reset-password/${token}`;
    await sendForgotPasswordMail(user.email, resetLink);

    res.status(200).json({ message: "Password reset token sent", token });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
const getEmailFromToken = async (req, res) => {

  const { token } = req.params;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Get email from token error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const loginWithGoogle = async (req, res) => {
  const { email, name, phone, image } = req.body;

  console.log(email, name, phone, image, 'loginWithGoogle called');
  if (!email || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        phone,
        email,
        password: null,
        image
      });
      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      image: user.image,
      address: user.address,
      bio: user.bio,
      token,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const updateProfile = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const updateProfileData = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password -__v');
  res.status(200).json(updateProfileData);
}


export {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getEmailFromToken,
  loginWithGoogle,
  updateProfile,

}