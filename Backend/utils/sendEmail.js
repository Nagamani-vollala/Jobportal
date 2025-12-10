// utils/sendEmail.js
import nodemailer from "nodemailer";

// Gmail credentials ko .env me store karo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // tumhara Gmail address
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
