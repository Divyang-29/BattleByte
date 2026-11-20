import "./PastTournaments.css";

export default function PastTournaments() {
  const tournaments = [
    {
      id: 1,
      image: "https://torado.envytheme.com/esports-gaming/default/assets/images/past-tournaments/tournaments1.webp",
      title: "Hercules Greek",
    },
    {
      id: 2,
      image: "https://torado.envytheme.com/esports-gaming/default/assets/images/past-tournaments/tournaments2.webp",
      title: "Gang Star Squad",
    },
    {
      id: 3,
      image: "https://torado.envytheme.com/esports-gaming/default/assets/images/past-tournaments/tournaments3.webp",
      title: "Woman Warrior",
    },
    {
      id: 4,
      image: "https://torado.envytheme.com/esports-gaming/default/assets/images/past-tournaments/tournaments4.webp",
      title: "Athena Greed",
    },
  ];

  return (
    <section className="past-section">
      <div className="container">

        <h2 className="past-title">Past Tournaments</h2>

        <div className="row">

          {tournaments.map((item) => (
            <div className="col-lg-3 col-md-6 mb-5" key={item.id}>
              
              <div className="past-card">

                <div className="past-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="past-info">

                  <div className="badge-circle">
                    <span><img src="https://torado.envytheme.com/esports-gaming/default/assets/images/past-tournaments/img.png" alt="" /></span>
                  </div>

                  <div>
                    <p className="past-date">Yesterday, 22:00</p>
                    <h5 className="past-name">{item.title}</h5>
                    <p className="past-meta">
                      1v1 • 15 slots • $99.00
                    </p>
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