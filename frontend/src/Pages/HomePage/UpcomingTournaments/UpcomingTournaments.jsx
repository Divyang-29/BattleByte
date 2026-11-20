import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchWithCache, API_URL } from "../../../config/api";
import "./UpcomingTournaments.css";

export default function UpcomingTournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchWithCache(`${API_URL}/api/tournaments`)
      .then((data) => setTournaments(data || []))
      .catch((err) => console.error(err));
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
        <div className="tournament-header">
          <div>
            <span className="tournament-subtitle">ESPORTS ARENA</span>
            <h2 className="tournament-main-title">Upcoming Tournaments</h2>
          </div>
          <Link to="/tournament" className="view-btn">
            View All <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>

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

          {tournaments.map((item) => {
            const { date, time } = formatDate(item.match_date);
            return (
              <div className="tournament-row" key={item.id}>
                {/* Teams */}
                <div className="team-cell">
                  <div className="team-badge">
                    <img
                      src={`${API_URL}/uploads/${item.team1_image}`}
                      alt="Team 1"
                      loading="lazy"
                    />
                  </div>
                  <span className="vs-badge">VS</span>
                  <div className="team-badge">
                    <img
                      src={`${API_URL}/uploads/${item.team2_image}`}
                      alt="Team 2"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="date-cell">
                  <span className="cell-date">
                    <i className="fa-regular fa-calendar-days me-1 text-danger"></i>{" "}
                    {date}
                  </span>
                  <span className="cell-time">{time}</span>
                </div>

                {/* Title */}
                <div className="title-cell">{item.title}</div>

                {/* Platform */}
                <div>
                  <span className="game-badge">{item.platform}</span>
                </div>

                {/* Slots */}
                <div className="slots-cell">
                  <i className="fa-solid fa-users text-secondary me-2"></i>
                  <span>{item.total_slots}</span>
                </div>

                {/* Watch */}
                <div className="text-end">
                  <a
                    href={item.watch_link || "#"}
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
          {tournaments.map((item) => {
            const { date, time } = formatDate(item.match_date);
            return (
              <div className="tournament-card-mobile" key={item.id}>
                <div className="card-top-bar">
                  <span className="mobile-game-tag">{item.platform}</span>
                  <span className="mobile-slots-tag">
                    <i className="fa-solid fa-users me-1"></i> {item.total_slots}{" "}
                    Slots
                  </span>
                </div>

                <h4 className="mobile-tournament-title">{item.title}</h4>

                <div className="mobile-matchup">
                  <div className="mobile-team">
                    <img
                      src={`${API_URL}/uploads/${item.team1_image}`}
                      alt="Team 1"
                      loading="lazy"
                    />
                  </div>
                  <span className="mobile-vs">VS</span>
                  <div className="mobile-team">
                    <img
                      src={`${API_URL}/uploads/${item.team2_image}`}
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
                    href={item.watch_link || "#"}
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
