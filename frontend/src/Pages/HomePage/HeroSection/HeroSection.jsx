import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT CONTENT */}
            <div className="col-lg-6 col-md-8">
              <div className="hero-content">
                <p className="hero-subtitle">ENJOY THE GAME</p>

                <h1 className="hero-title">
                  Prove Your Skills <br />
                  And Play Game
                </h1>

                <button className="cyber-btn">
                  <span>Join Now</span>
                </button>
              </div>
            </div>

            {/* RIGHT EMPTY COLUMN (for spacing like design) */}
            <div className="col-lg-6 d-none d-lg-block"></div>

          </div>
        </div>
      </div>
    </section>
  );
}