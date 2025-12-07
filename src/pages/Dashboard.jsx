import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-card">
      <h2>Welcome {user?.email}</h2>
      <p>You are logged in!</p>
    </div>
  );
}
