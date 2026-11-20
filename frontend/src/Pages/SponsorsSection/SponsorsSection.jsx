import React, { useEffect, useState } from "react";
import "./SponsorsSection.css";

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/sponsors")
      .then((res) => res.json())
      .then((data) => {
        setSponsors(data.data || []);
      })
      .catch((err) => {
        console.error("Sponsors fetch error:", err);
        setSponsors([]);
      });
  }, []);

  return (
    <section className="es-sponsors-wrapper">
      <div className="container">

        <div className="es-sponsors-grid">
          {sponsors.map((sponsor) => (
            <div className="es-sponsor-card" key={sponsor.id}>
              <img
                src={`http://localhost:8080/uploads/${sponsor.image}`}
                alt="Sponsor"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}