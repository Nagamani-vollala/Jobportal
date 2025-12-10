import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/generateOtp.js";
import User from "../models/User.js";

let otpStore = {}; // temporary memory store

// 👉 SEND OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ success: false, message: "Email required" });

  const otp = generateOTP();
  otpStore[email] = otp;

  // Email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP Sent" });
  } catch (err) {
    console.error("Error sending mail:", err);
    res.json({ success: false, message: "Email Error", err });
  }
};

// 👉 VERIFY OTP + REGISTER USER
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name, contact, password, role, designation, company } = req.body;

    // Step 1: Check OTP validity
    if (!otpStore[email]) {
      return res.json({ success: false, message: "OTP not found" });
    }

    if (otpStore[email] !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // ✅ Step 2: OTP valid — register user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      role,
      designation,
      company,
    });

    await newUser.save();

    // Step 3: Delete OTP after use
    delete otpStore[email];

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
