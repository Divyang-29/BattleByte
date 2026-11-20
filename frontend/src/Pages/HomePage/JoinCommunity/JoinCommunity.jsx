import "./JoinCommunity.css";

export default function JoinCommunity() {
  return (
    <section className="join-section">
      <div className="container">

        <div className="join-wrapper">

          {/* Image */}
          <div className="join-image">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRglpWWjx-Kw3pTFM1ENYjkVYcCO-1SQWKOp4mD0joccd-At-9P"
              alt="gaming"
            />
          </div>

          {/* Overlay Content */}
          <div className="join-content">
            <h2>
              Join Our Community To Get All
              <br />
              Kinds Of Gaming Benefits
            </h2>

            <button className="cyber-btn">
              <span>Join Community</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}