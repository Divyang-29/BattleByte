import React from "react";
import "./WhoWeAreSection.css";

export default function WhoWeAreSection() {
  return (
    <section className="who-wrapper">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="who-image-box">
              <img
                src="https://torado.envytheme.com/esports-gaming/default/assets/images/about/about.png"
                alt="Gaming Company"
                className="img-fluid who-image"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div className="who-content-area">

              <span className="who-tagline">About Torado</span>

              <h2 className="who-heading">
                We're The Best Gaming & Sports Company In The Gaming World
              </h2>

              <p className="who-description">
                Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit,
                eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh.
              </p>

              <div className="who-highlight-box">
                <h5 className="who-highlight-title">
                  <span className="who-star">★</span> Our Mission
                </h5>

                <p className="who-highlight-text">
                  Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo,
                  lacinia eget consectetur sed, convallis at tellus. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                  Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper
                  sit amet ligula. Pellentesque in ipsum id orci porta dapibus.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}