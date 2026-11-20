import React, { useEffect, useState } from "react";
import "./ActiveTeamSection.css";

export default function ActiveTeamSection() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/team`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data.data || []);
      })
      .catch((err) => {
        console.error("Team fetch error:", err);
        setTeam([]);
      });
  }, []);

  return (
    <section className="active-team-section">
      <div className="container">

        <h2 className="active-team-title text-center">
          Active Team Members
        </h2>

        <div className="row mt-5">

          {team.map((member) => (
            <div className="col-lg-3 col-md-6 mb-5" key={member.id}>

              <div className="active-team-card">

                <div className="active-team-image">
                  <img
                    src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${member.image}`}
                    alt={member.name}
                  />
                </div>

                <div className="active-team-info text-center">

                  <h5>{member.name}</h5>

                  <div className="active-team-socials">
                    <i className="fab fa-vimeo-v"></i>
                    <i className="fab fa-youtube"></i>
                    <i className="fab fa-twitch"></i>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}