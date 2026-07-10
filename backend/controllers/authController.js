import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import { sendEmail, transporter } from "../utils/nodemailer.js";
import { otpTemplate } from "../templates/otptemplate.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
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

    const token = await generateToken(user.id);

    const sendOtp = async (user) => {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const verfiyOtp_ExpiredAt = Date.now() + 20 * 60 * 1000;
      user.verifyOtp = otp;
      user.verfiyOtp_ExpiredAt = verfiyOtp_ExpiredAt;
      await user.save();
      return otp;
    };
    const otp = await sendOtp(user);

    await sendEmail(user.email, "Verify Your Email", otpTemplate(otp));
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Internal server error", error });
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

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
    const token = await generateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Internal server error", error });
    return;
  }
};

const getmyProfile = async (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
};

const sendVerifyOtp = async (req, res) => {
  const user = req.user;
  const { email } = req.body;

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

    const mailOptons = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Account",
      text: `Hello, your OTP is ${otp}. It will expire in 20 mins.`,
    };

    await transporter.sendMail(mailOptons);
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
    console.log(user);
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
    user.resetPassword_Token = token;
    user.resetPassword_Token_ExpiredAt = Date.now() + 20 * 60 * 1000;
    await user.save();
    const resetPasswordLink = `${process.env.CLIENT_URL}/api/auth/reset-password/${token}`;

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
    console.log(user);
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
    user.resetPassword_Token=null;
    user.resetPassword_Token_ExpiredAt=null;
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

export {
  registerUser,
  signinUser,
  getmyProfile,
  resetPasswordToken,
  resetPassword,
  sendVerifyOtp,
  verifyOtp,
};
