import React from "react";
import "./LiveStreamingSection.css";

export default function LiveStreamingSection() {
  return (
    <section className="live-section">
      <div className="container">

        {/* Header */}
        <div className="live-header d-flex justify-content-between align-items-center">
          <h2 className="live-title">Check Our Live Streaming</h2>
          <a href="#" className="live-viewall">
            View All →
          </a>
        </div>

        {/* Content Row */}
        <div className="row align-items-center mt-5">

          {/* Left Image */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="side-image">
              <img
                src="https://torado.envytheme.com/esports-gaming/default/assets/images/live-streaming/live-3.webp"
                alt="Game Left"
                className="img-fluid"
              />
            </div>
          </div>

          {/* Center Video */}
          <div className="col-lg-6 col-md-12">
            <div className="main-video">

              <img
                src="https://torado.envytheme.com/esports-gaming/default/assets/images/live-streaming/live-gif.gif"
                alt="Main Video"
                className="img-fluid"
              />

              {/* Play Button */}
              <div className="play-button">
                <span>▶</span>
              </div>

            </div>

            {/* Bottom Progress Line */}
            <div className="video-progress">
              <div className="progress-bar"></div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="side-image">
              <img
                src="https://torado.envytheme.com/esports-gaming/default/assets/images/live-streaming/live-1.webp"
                alt="Game Right"
                className="img-fluid"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}