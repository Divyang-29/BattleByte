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

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <section className="tournament-section">
      <div className="container">
        <h2 className="tournament-title">Upcoming Tournaments</h2>

        {/* Desktop Table View (>= 992px) */}
        <div className="tournament-table d-none d-lg-block">
          <div className="tournament-row header-row">
            <div>TEAMS</div>
            <div>DATE & TIME</div>
            <div>TOURNAMENT</div>
            <div>GAME</div>
            <div>SLOTS</div>
            <div className="text-end">ACTION</div>
          </div>

          {tournaments.map((tour) => {
            const { date, time } = formatDate(tour.match_date);
            return (
              <div key={tour.id} className="tournament-row">
                {/* TEAM */}
                <div className="team-cell">
                  <div className="team-badge">
                    <img
                      src={`${API_URL}/uploads/${tour.team1_image}`}
                      alt="Team 1"
                      loading="lazy"
                    />
                  </div>
                  <span className="vs-badge">VS</span>
                  <div className="team-badge">
                    <img
                      src={`${API_URL}/uploads/${tour.team2_image}`}
                      alt="Team 2"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* DATE */}
                <div className="date-cell">
                  <span className="cell-date">
                    <i className="fa-regular fa-calendar-days me-1 text-danger"></i>{" "}
                    {date}
                  </span>
                  <span className="cell-time">{time}</span>
                </div>

                {/* TITLE */}
                <div className="title-cell">{tour.title}</div>

                {/* PLATFORM */}
                <div>
                  <span className="game-badge">{tour.platform}</span>
                </div>

                {/* SLOTS */}
                <div className="slots-cell">
                  <i className="fa-solid fa-users text-secondary me-2"></i>
                  <span>{tour.total_slots}</span>
                </div>

                {/* WATCH */}
                <div className="text-end">
                  <a
                    href={tour.watch_link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="watch-action-btn"
                  >
                    <i className="fa-brands fa-youtube me-2"></i> Watch
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Card View (< 992px) */}
        <div className="tournament-mobile-list d-lg-none">
          {tournaments.map((tour) => {
            const { date, time } = formatDate(tour.match_date);
            return (
              <div className="tournament-card-mobile" key={tour.id}>
                <div className="card-top-bar">
                  <span className="mobile-game-tag">{tour.platform}</span>
                  <span className="mobile-slots-tag">
                    <i className="fa-solid fa-users me-1"></i> {tour.total_slots}{" "}
                    Slots
                  </span>
                </div>

                <h4 className="mobile-tournament-title">{tour.title}</h4>

                <div className="mobile-matchup">
                  <div className="mobile-team">
                    <img
                      src={`${API_URL}/uploads/${tour.team1_image}`}
                      alt="Team 1"
                      loading="lazy"
                    />
                  </div>
                  <span className="mobile-vs">VS</span>
                  <div className="mobile-team">
                    <img
                      src={`${API_URL}/uploads/${tour.team2_image}`}
                      alt="Team 2"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mobile-info-footer">
                  <div className="mobile-datetime">
                    <i className="fa-regular fa-calendar text-danger me-2"></i>
                    <div>
                      <div className="mobile-date">{date}</div>
                      <div className="mobile-time">{time}</div>
                    </div>
                  </div>

                  <a
                    href={tour.watch_link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-watch-btn"
                  >
                    <i className="fa-brands fa-youtube me-2"></i> Watch
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
