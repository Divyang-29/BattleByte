import React, { useEffect, useState } from "react";
import "./ArenaLiveStreams.css";

export default function ArenaLiveStreams() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/live-streams`)
      .then((res) => res.json())
      .then((data) => {
        setStreams(data.data || []); // ✅ FIXED
      })
      .catch((err) => {
        console.error("Live stream fetch error:", err);
        setStreams([]);
      });
  }, []);

  return (
    <section className="arena-live-wrapper">
      <div className="container">
        <div className="row">
          {streams.map((stream) => (
            <div className="col-lg-4 col-md-6 mb-5" key={stream.id}>
              <div className="arena-live-card">

                <div className="arena-live-banner">
                  <img
                    src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${stream.banner_image}`}
                    alt="Banner"
                  />

                  <span className="arena-live-badge">LIVE</span>

                  <div className="arena-play-btn">
                    <a
                      href={stream.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ▶
                    </a>
                  </div>
                </div>

                <div className="arena-live-info">
                  <h5>{stream.title}</h5>
                  <p className="arena-game-name">{stream.game_name}</p>

                  <div className="arena-streamer-info">
                    <img
                      src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${stream.streamer_image}`}
                      alt="Streamer"
                    />
                    <div>
                      <h6>{stream.streamer_name}</h6>
                      <span>{stream.viewers} Viewers</span>
                    </div>
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