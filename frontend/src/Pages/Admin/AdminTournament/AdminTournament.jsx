import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminTournament.css";

function AdminTournament() {
  const API = "http://localhost:8080";

  const [formData, setFormData] = useState({
    title: "",
    match_date: "",
    platform: "",
    total_slots: "",
    watch_link: "",
  });

  const [team1Image, setTeam1Image] = useState(null);
  const [team2Image, setTeam2Image] = useState(null);

  const [team1Preview, setTeam1Preview] = useState(null);
  const [team2Preview, setTeam2Preview] = useState(null);

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTournaments = async () => {
    const res = await axios.get(`${API}/tournaments`);
    setTournaments(res.data);
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, team) => {
    const file = e.target.files[0];
    if (!file) return;

    if (team === "team1") {
      setTeam1Image(file);
      setTeam1Preview(URL.createObjectURL(file));
    } else {
      setTeam2Image(file);
      setTeam2Preview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("match_date", formData.match_date);
    data.append("platform", formData.platform);
    data.append("total_slots", formData.total_slots);
    data.append("watch_link", formData.watch_link);

    data.append("team1_image", team1Image);
    data.append("team2_image", team2Image);

    setLoading(true);
    await axios.post(`${API}/tournaments`, data);
    setLoading(false);

    fetchTournaments();
  };

  return (
    <div className="admin-tournament-container">
      <h1>Tournament Management</h1>

      <form className="tournament-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Tournament Title"
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="match_date"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="platform"
          placeholder="Platform (BGMI, Free Fire...)"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="total_slots"
          placeholder="Total Slots"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="watch_link"
          placeholder="Watch Link"
          onChange={handleChange}
          required
        />

        <div className="image-section">
          <label>
            Team 1 Image
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "team1")}
              required
            />
          </label>
          {team1Preview && <img src={team1Preview} alt="team1" />}
        </div>

        <div className="image-section">
          <label>
            Team 2 Image
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "team2")}
              required
            />
          </label>
          {team2Preview && <img src={team2Preview} alt="team2" />}
        </div>

        <button>
          {loading ? "Creating..." : "Create Tournament"}
        </button>
      </form>

      <div className="tournament-grid">
        {tournaments.map((t) => (
          <div className="tournament-card" key={t.id}>
            <div className="teams">
              <img src={`${API}/uploads/${t.team1_image}`} alt="team1" />
              <span>VS</span>
              <img src={`${API}/uploads/${t.team2_image}`} alt="team2" />
            </div>
            <h3>{t.title}</h3>
            <p>{t.platform}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTournament;