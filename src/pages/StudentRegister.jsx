import React, { useState } from "react";
import axios from "../api/axios";

export default function StudentRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    qualification: "",
    skills: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("/auth/register-student", form);
    alert("Student registered!");
  }

  return (
    <div className="form-container">
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} />
        <input name="qualification" placeholder="Highest Qualification" onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

