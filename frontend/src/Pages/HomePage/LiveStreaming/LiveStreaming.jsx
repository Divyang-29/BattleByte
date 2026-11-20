import "./LiveStreaming.css";

export default function LiveStreaming() {
  return (
    <section className="live-section">
      <div className="container-fluid p-0">
        <div className="row g-0">

          {/* LEFT SIDE */}
          <div className="col-lg-6 col-12 live-left d-flex align-items-center">
            <div className="live-content">
              <p className="live-subtitle">OUR LATEST VIDEOS</p>

              <h2 className="live-title">
                Check Our Live <br /> Streaming
              </h2>

              <p className="live-text">
                Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia curae donec velit neque, auctor sit
                amet aliquam vel, ullamcorper sit amet ligula.
              </p>

              <button className="stream-btn">
                <span>Add Streaming</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 col-12 live-right">
            <div className="video-wrapper">
              <img
                src="https://media0.giphy.com/media/RqWRrvvnSHL9s330kJ/giphy.gif"
                alt="stream"
                className="video-img"
              />

              <div className="play-btn">
                <i className="fas fa-play"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}