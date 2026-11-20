import { useEffect, useState } from "react";
import { fetchWithCache, API_URL } from "../../../config/api";
import "./UpcomingTournaments.css";

export default function UpcomingTournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchWithCache(`${API_URL}/api/tournaments`)
      .then((data) => setTournaments(data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="tournament-section">
      <div className="container">
        <div className="tournament-header">
          <h2>Upcoming Tournaments</h2>
          <button className="view-btn">View All</button>
        </div>

        <div className="tournament-table">
          {/* Header */}
          <div className="tournament-row header-row">
            <div>TEAM</div>
            <div>DATE</div>
            <div>TITLE</div>
            <div>PLATFORM</div>
            <div>SLOTS</div>
            <div>WATCH</div>
          </div>

          {/* Rows */}
          {tournaments.map((item) => (
            <div className="tournament-row" key={item.id}>
              {/* Teams */}
              <div className="team-cell">
                <img
                  src={`${API_URL}/uploads/${item.team1_image}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span>VS</span>
                <img
                  src={`${API_URL}/uploads/${item.team2_image}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Date */}
              <div>
                {new Date(item.match_date).toLocaleDateString()} <br />
                {new Date(item.match_date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Title */}
              <div>{item.title}</div>

              {/* Platform */}
              <div>{item.platform}</div>

              {/* Slots */}
              <div>{item.total_slots}</div>

              {/* Watch */}
              <div>
                <a
                  href={item.watch_link}
                  target="_blank"
                  rel="noreferrer"
                  className="watch-link"
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
