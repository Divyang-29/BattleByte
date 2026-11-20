import { useEffect, useState } from "react";
import "./UpcomingTournaments.css";

export default function UpcomingTournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tournaments")
      .then((res) => res.json())
      .then((data) => setTournaments(data))
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
                  src={`http://localhost:8080/uploads/${item.team1_image}`}
                  alt=""
                />
                <span>VS</span>
                <img
                  src={`http://localhost:8080/uploads/${item.team2_image}`}
                  alt=""
                />
              </div>

              {/* Date */}
              <div>
                {new Date(item.match_date).toLocaleString()}
              </div>

              {/* Title */}
              <div>{item.title}</div>

              {/* Platform */}
              <div>{item.platform}</div>

              {/* Slots */}
              <div>0/{item.total_slots}</div>

              {/* Watch */}
              <div className="watch-icons">
                <a href={item.watch_link} target="_blank" rel="noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
                <i className="fab fa-twitch"></i>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}