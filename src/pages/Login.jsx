import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    
    // reset fields
    setEmail("");
    setPassword("");
    setRole("student");

    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>

      <form onSubmit={handleLogin} className="form">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <div className="role-box">
          <label>
            <input type="radio" value="student" checked={role === "student"} onChange={() => setRole("student")} />
            Student
          </label>

          <label>
            <input type="radio" value="recruiter" checked={role === "recruiter"} onChange={() => setRole("recruiter")} />
            Recruiter
          </label>
        </div>

        <button type="submit" className="btn register-btn">Login</button>
      </form>
    </div>
  );
}
