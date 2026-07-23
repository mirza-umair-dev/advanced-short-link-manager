import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import crypto from "crypto";
import { sendEmail, transporter } from "../utils/nodemailer.js";
import { otpTemplate } from "../templates/otptemplate.js";
dotenv.config();
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already Exist" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const refreshToken =await generateRefreshToken(user.id);
    const acessToken = await generateAccessToken(user.id);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();
    res.cookie("accessToken", acessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const sendOtp = async (user) => {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const verfiyOtp_ExpiredAt = Date.now() + 20 * 60 * 1000;
      user.verifyOtp = otp;
      user.verfiyOtp_ExpiredAt = verfiyOtp_ExpiredAt;
      await user.save();
      return otp;
    };
    const otp = await sendOtp(user);

    sendEmail(user.email, "Verify Your Email", otpTemplate(otp));

    return res.status(201).json({
      success: true,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Internal server error"});
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }
    const refreshToken = await generateRefreshToken(user.id);
    const acessToken = await generateAccessToken(user.id);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();
    res.cookie("accessToken", acessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Internal server error"});
    return;
  }
};

const getmyProfile = async (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
};

const sendVerifyOtp = async (req, res) => {
  const user = req.user;

  try {
    const sendOtp = async (user) => {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const verfiyOtp_ExpiredAt = Date.now() + 20 * 60 * 1000;
      user.verifyOtp = otp;
      user.verfiyOtp_ExpiredAt = verfiyOtp_ExpiredAt;
      await user.save();
      return otp;
    };
    const otp = await sendOtp(user);

    sendEmail(user.email, "Verify Your Email", otpTemplate(otp));
    return res
      .status(200)
      .json({ success: true, message: "Otp Sent Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
};

const verifyOtp = async (req, res) => {
  const user = req.user;
  const otp = Number(req.body.otp);

  try {
    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    if (user.verfiyOtp_ExpiredAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if (user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    user.isVerified = true;
    ((user.role = "user"), (user.verfiyOtp_ExpiredAt = null));
    user.verifyOtp = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resetPasswordToken = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedResetPasswordToken = bcrypt.hash(token,10)
    user.resetPassword_Token = hashedResetPasswordToken;
    user.resetPassword_Token_ExpiredAt = Date.now() + 20 * 60 * 1000;
    await user.save();
    const resetPasswordLink = `${process.env.CLIENT_URI}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>Password Reset</h2>

        <p>Click the link below:</p>

        <a href="${resetPasswordLink}">
            Reset Password
        </a>
    `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Reset Link sent Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server Error!" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPassword_Token: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (user.resetPassword_Token_ExpiredAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPassword_Token = null;
    user.resetPassword_Token_ExpiredAt = null;
    res.clearCookie("accessToken", {});
    res.clearCookie("refreshToken", {});

    const refreshToken = await generateRefreshToken(user.id);
    const acessToken = await generateAccessToken(user.id);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password Successfully changed!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    if (req.user) {
      req.user.refreshToken = null;
      await req.user.save();
    }

    res.clearCookie("accessToken", {});
    res.clearCookie("refreshToken", {});
    
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid session" });
    }

    const isValid = await bcrypt.compare(token, user.refreshToken);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid session" });
    }

    const newAccessToken = generateAccessToken(user._id);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    return res.status(200).json({ success: true, message: "Token refreshed" });
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Refresh token expired, please log in again",
      });
  }
};

export {
  registerUser,
  signinUser,
  getmyProfile,
  resetPasswordToken,
  resetPassword,
  sendVerifyOtp,
  verifyOtp,
  logoutUser,
  refreshAccessToken,
};
