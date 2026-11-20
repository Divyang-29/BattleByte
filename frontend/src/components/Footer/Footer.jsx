import "./Footer.css";

export default function Footer() {
  return (
    <>
    <div className="partners-banner">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Text */}
            <div className="col-lg-4">
              <p className="partners-subtitle">WE LOVE</p>
              <h2 className="partners-title">Our Partners</h2>
            </div>

            {/* Logos */}
            <div className="col-lg-8">
              <div className="partners-logos">
                <img src="https://torado.envytheme.com/esports-gaming/default/assets/images/partners/partners2.png" alt="" />
                <img src="https://torado.envytheme.com/esports-gaming/default/assets/images/partners/partners3.png" alt="" />
                <img src="https://torado.envytheme.com/esports-gaming/default/assets/images/partners/partners4.png" alt="" />
                <img src="https://torado.envytheme.com/esports-gaming/default/assets/images/partners/partners1.png" alt="" />
                <img src="https://torado.envytheme.com/esports-gaming/default/assets/images/partners/partners5.png" alt="" />
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* ===== Newsletter Section ===== */}
      <div className="footer-newsletter">
        <div className="container text-center">
          <h2>Need Help?</h2>

          <div className="newsletter-box d-flex justify-content-center align-items-center">
            <i className="far fa-envelope"></i>
            <input
              type="email"
              placeholder="support@torado.com"
              className="newsletter-input"
            />
            <button className="newsletter-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Main Footer ===== */}
      <footer className="footer-area">
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h3 className="footer-logo">
                <span className="logo-circle"></span> Torado
              </h3>

              <p>
                <span>Phone:</span> 079 3105 0968
              </p>
              <p>
                <span>Address:</span> 07 Crescent Avenue Duible KW8 19MK
              </p>
              <p>
                <span>Email:</span> hello@torado.com
              </p>
            </div>

            {/* Column 2 */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h4>Popular eSports Game</h4>
              <ul className="footer-links">
                <li>CS:GO</li>
                <li>Hercules Greek</li>
                <li>Gang Star Squad</li>
                <li>Woman Warrior</li>
                <li>Athena Greed</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h4>Quick Link</h4>
              <ul className="footer-links">
                <li>About</li>
                <li>Contact</li>
                <li>Gaming News</li>
                <li>Privacy Policy</li>
                <li>Terms and Conditions</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h4>Latest News</h4>

              <div className="news-item d-flex mb-3">
                <img
                  src="https://torado.envytheme.com/esports-gaming/default/assets/images/footer/gif-1.gif"
                  alt=""
                  className="news-img"
                />
                <div>
                  <h6>Kombat Fight</h6>
                  <small>Jan 05, 2025</small>
                </div>
              </div>

              <div className="news-item d-flex">
                <img
                  src="https://torado.envytheme.com/esports-gaming/default/assets/images/footer/gif-2.gif"
                  alt=""
                  className="news-img"
                />
                <div>
                  <h6>Fortnite Life</h6>
                  <small>Jan 05, 2025</small>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom d-flex justify-content-between align-items-center mt-4 pt-3">
            <p>© Torado All Rights Reserved</p>

            <div className="footer-social">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-twitch"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
