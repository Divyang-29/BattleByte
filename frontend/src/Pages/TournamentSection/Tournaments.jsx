import React, { useEffect, useState } from "react";
import "./Tournaments.css";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/tournaments`)
      .then(res => res.json())
      .then(data => setTournaments(data))
      .catch(err => console.error("Tournament error:", err));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="tournament-section">
      <div className="container">
        <h2 className="tournament-title">Upcoming Tournaments</h2>

        <div className="tournament-table">

          {/* HEADER */}
          <div className="tournament-header">
            <span>TEAM</span>
            <span>DATE</span>
            <span>TITLE</span>
            <span>PLATFORM</span>
            <span>SLOTS</span>
            <span>WATCH</span>
          </div>

          {/* ROWS */}
          {tournaments.map(tour => (
            <div key={tour.id} className="tournament-row">

              {/* TEAM */}
              <div className="team-cell">
                <img
                  src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${tour.team1_image}`}
                  alt=""
                />
                <span className="vs">VS</span>
                <img
                  src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${tour.team2_image}`}
                  alt=""
                />
              </div>

              {/* DATE */}
              <div>{formatDate(tour.match_date)}</div>

              {/* TITLE */}
              <div>{tour.title}</div>

              {/* PLATFORM */}
              <div>{tour.platform}</div>

              {/* SLOTS */}
              <div>0/{tour.total_slots}</div>

              {/* WATCH */}
              <div className="watch-icons">
                <a href={tour.watch_link} target="_blank" rel="noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
                <i className="fab fa-twitch"></i>
                <i className="fab fa-vimeo-v"></i>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}