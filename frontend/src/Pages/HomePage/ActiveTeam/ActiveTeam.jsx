import { useEffect, useState } from "react";
import "./ActiveTeam.css";

export default function ActiveTeam() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/team`)
      .then((res) => res.json())
      .then((data) => setTeam(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="active-team-section">
      <div className="container">

        <div className="active-team-header">
          <h2>Active Team Members</h2>
          <button className="active-team-btn">View All</button>
        </div>

        {/* Horizontal Scroll */}
        <div className="active-team-scroll">

          {team.map((member) => (
            <div className="active-team-card" key={member.id}>
              
              <div className="active-team-image">
                <img
                  src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${member.image}`}
                  alt={member.name}
                />
              </div>

              <div className="active-team-info">
                <h5>{member.name}</h5>

                <div className="active-team-social">
                  <i className="fab fa-vimeo-v"></i>
                  <i className="fab fa-youtube"></i>
                  <i className="fab fa-twitch"></i>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}