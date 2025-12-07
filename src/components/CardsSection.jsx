import React from "react";
import "./CardsSection.css";

const CardsSection = () => {
  return (
    <div className="container">
      
      {/* Employer Card */}
      <div className="card">
        <div className="card-text">
          <h2>For Employers</h2>
          <p>Find professionals from around the world and across all skills.</p>
          <button className="btn">Post Jobs</button>
        </div>

        <div className="card-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8662/8662777.png"
            alt="Employer Illustration"
          />
        </div>
      </div>

      {/* Candidate Card */}
      <div className="card">
        <div className="card-text">
          <h2>For Candidate</h2>
          <p>Build your professional profile, find new job opportunities.</p>
          <button className="btn">Upload your CV</button>
        </div>

        <div className="card-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4149/4149670.png"
            alt="Candidate Illustration"
          />
        </div>
      </div>

    </div>
  );
};

export default CardsSection;
