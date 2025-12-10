import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 👉 REGISTER USER AFTER OTP VERIFICATION
export const registerUser = async (req, res) => {
  const { name, email, password, contact, role, designation, company } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: "Email already registered" });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPass,
      contact,
      role,
      designation,
      company,
    });

    await user.save();

    res.json({ success: true, message: "User Registered" });
  } catch (err) {
    res.json({ success: false, message: "Error", err });
  }
};
// 👉 LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });
    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    res.json({ success: false, message: "Error", err });
  }
};
