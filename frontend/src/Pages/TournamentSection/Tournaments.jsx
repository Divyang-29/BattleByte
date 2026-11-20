import React, { useEffect, useState } from "react";
import { fetchWithCache, API_URL } from "../../config/api";
import "./Tournaments.css";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchWithCache(`${API_URL}/api/tournaments`)
      .then((data) => setTournaments(data || []))
      .catch((err) => console.error("Tournament error:", err));
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
          {tournaments.map((tour) => (
            <div key={tour.id} className="tournament-row">
              {/* TEAM */}
              <div className="team-cell">
                <img
                  src={`${API_URL}/uploads/${tour.team1_image}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="vs">VS</span>
                <img
                  src={`${API_URL}/uploads/${tour.team2_image}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* DATE */}
              <div>{formatDate(tour.match_date)}</div>

              {/* TITLE */}
              <div>{tour.title}</div>

              {/* PLATFORM */}
              <div>{tour.platform}</div>

              {/* SLOTS */}
              <div>{tour.total_slots}</div>

              {/* WATCH */}
              <div>
                <a
                  href={tour.watch_link}
                  target="_blank"
                  rel="noreferrer"
                  className="watch-btn"
                >
                  <i className="fa-brands fa-youtube"></i> Watch
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
