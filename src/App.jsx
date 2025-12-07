import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";
import CardsSection from "./components/CardsSection";

import "./App.css";

export default function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="nav">
        <Link to="/" className="nav-brand">JobPortal</Link>
        <div className="nav-links">
          {!user && <Link to="/register">Register</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <button className="btn-link" onClick={logout}>Logout</button>}
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<CardsSection />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}


