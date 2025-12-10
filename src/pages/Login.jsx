import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 🔥 Correct Backend URL
      const res = await axios.post(
        "http://localhost:5000/api/login",
        form
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login Successful!");

        // Role-based redirect
        if (res.data.user.role === "recruiter") {
          navigate("/recruiter-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        alert("Login Failed: " + res.data.message);
      }
    } catch (err) {
      alert("Network Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form">
        <h2 className="form-title">Login</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", marginLeft: "5px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button type="submit" className="btn login-btn">
          Login
        </button>

        <p className="signup-link">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
