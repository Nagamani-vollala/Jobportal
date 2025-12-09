import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div style={{ textAlign: "center", paddingTop: "80px" }}>
      <h1>Welcome to JobPortal</h1>
      <p>Your gateway to jobs & opportunities</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/register" style={{ marginRight: "20px" }}>
          Register
        </Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
