import React, { useEffect, useState } from "react";
import "./SponsorsSection.css";

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/sponsors`)
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
                src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${sponsor.image}`}
                alt="Sponsor"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}