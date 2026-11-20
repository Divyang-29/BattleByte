import React from "react";
import "./GrowingStatsSection.css";

export default function GrowingStatsSection() {
  return (
    <section
      className="stats-wrapper d-flex align-items-center"
      style={{
        backgroundImage: `url("https://i.pinimg.com/1200x/4a/6d/3d/4a6d3d3afb9515d0ae125edb833ddfb7.jpg")`,
      }}
    >
      <div className="container text-center">
        <h2 className="stats-heading">Constantly Growing</h2>

        <div className="row mt-5">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-card">
              <h3>5K+</h3>
              <p>Total Gamers</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-card">
              <h3>999+</h3>
              <p>Matches Played</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-card">
              <h3>3K+</h3>
              <p>Leagues Joined</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="stat-card">
              <h3>100+</h3>
              <p>Winning Distributed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}