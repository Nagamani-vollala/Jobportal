import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    designation: "",
    company: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = form, 2 = otp screen

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👉 SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!form.email) {
      alert("Please enter email first");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/send-otp", {
        email: form.email,
      });

      if (res.data.success) {
        alert("OTP sent to " + form.email);
        setStep(2); // go to OTP screen
      } else {
        alert("Failed to send OTP");
      }
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  // 👉 VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email: form.email,
        otp,
      });

      if (res.data.success) {
        alert("Registration Successful!");

        // Reset form
        setForm({
          name: "",
          contact: "",
          email: "",
          password: "",
          designation: "",
          company: "",
        });
        setRole("student");
        setOtp("");
        setStep(1);

        navigate("/login");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="form-container">

      {/* ------------------- STEP 1 : REGISTER FORM ------------------- */}
      {step === 1 && (
        <form onSubmit={sendOtp} className="form">
          <h2 className="form-title">Register</h2>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Contact Number</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Recruiter extra fields */}
          {role === "recruiter" && (
            <>
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
              />

              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              />
            </>
          )}

          <div className="role-box">
            <label>
              <input
                type="radio"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
              />
              Student
            </label>

            <label>
              <input
                type="radio"
                value="recruiter"
                checked={role === "recruiter"}
                onChange={() => setRole("recruiter")}
              />
              Recruiter
            </label>
          </div>

          {/* Button to send OTP */}
          <button type="submit" className="btn register-btn">
            Send OTP
          </button>
        </form>
      )}

      {/* ------------------- STEP 2 : OTP SCREEN ------------------- */}
      {step === 2 && (
        <div className="form">
          <h2>Enter OTP</h2>

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="btn register-btn" onClick={verifyOtp}>
            Verify OTP
          </button>

          <button
            className="btn"
            style={{ marginTop: "10px", backgroundColor: "gray" }}
            onClick={() => setStep(1)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
