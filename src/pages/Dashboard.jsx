import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Job Portal Dashboard</h1>

      <div className="home-card" style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Welcome {user?.Name}</h2>
        <p>You are logged in!</p>
      </div>

      <div style={{ padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
          <div style={{ width: "380px", padding: "30px", background: "#f8f4e3", borderRadius: "14px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
            <h3>For Employers</h3>
            <p>Find candidates from across all skills and experience levels.</p>
            <button style={{ width: "100%", padding: "14px", marginTop: "18px", cursor: "pointer", backgroundColor: "#007b55", color: "white", border: "none", borderRadius: "10px" }}>
              Post Jobs
            </button>
          </div>

          <div style={{ width: "380px", padding: "30px", background: "#f8f4e3", borderRadius: "14px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
            <h3>For Candidates</h3>
            <p>Build your profile and find jobs that match your skills.</p>
            <button style={{ width: "100%", padding: "14px", marginTop: "18px", cursor: "pointer", backgroundColor: "#007b55", color: "white", border: "none", borderRadius: "10px" }}>
              Upload Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
