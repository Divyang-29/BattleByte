import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar d-flex justify-content-between align-items-center px-4">
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-vimeo-v"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-twitch"></i>
        </div>
        <div className="language">
          <i className="fas fa-globe"></i> ENG
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar px-4">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <div className="logo-circle me-2"></div>
          <span className="brand-text">BattleByte</span>
        </a>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            {/* HOME */}
            <li className="nav-item">
              <a className="nav-link active" href="/">HOME</a>
            </li>

            {/* PAGES */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                PAGES
              </a>

              <ul className="dropdown-menu custom-dropdown">

                <li><a className="dropdown-item" href="/about">ABOUT US</a></li>
                <li><a className="dropdown-item" href="/team">TEAM</a></li>
                <li><a className="dropdown-item" href="/gallery">GALLERY</a></li>
                <li><a className="dropdown-item" href="/faqs">FAQ</a></li>
                <li><a className="dropdown-item" href="/live-stream">LIVE STREAMING</a></li>
                <li><a className="dropdown-item" href="/sponsors">SPONSORS</a></li>

                {/* MY ACCOUNT (Nested Dropdown) */}
                <li className="dropdown-submenu position-relative">
                  <a className="dropdown-item d-flex justify-content-between align-items-center" href="#">
                    MY ACCOUNT
                    <span className="submenu-arrow">▶</span>
                  </a>

                  <ul className="dropdown-menu custom-submenu">
                    <li><a className="dropdown-item" href="/login">LOGIN</a></li>
                    <li><a className="dropdown-item" href="/register">REGISTER</a></li>
                  </ul>
                </li>

                <li><a className="dropdown-item" href="/terms">TERMS OF SERVICE</a></li>
                <li><a className="dropdown-item" href="/privacy">PRIVACY POLICY</a></li>
              </ul>
            </li>

            {/* OTHER LINKS */}
            <li className="nav-item"><a className="nav-link" href="/tournament">TOURNAMENT</a></li>
            <li className="nav-item"><a className="nav-link" href="/product">SHOP</a></li>
            <li className="nav-item"><a className="nav-link" href="/blogs">BLOG</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">CONTACT US</a></li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center nav-right">
            <i className="fas fa-search me-4"></i>
            <a href="/login" className="auth-link">LOG IN</a>
            <span className="mx-2">/</span>
            <a href="/register" className="auth-link">SIGN UP</a>
          </div>
        </div>
      </nav>
    </>
  );
}