import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminLiveStream.css";

function AdminLiveStream() {
  const API = "http://localhost:8080";

  const [formData, setFormData] = useState({
    title: "",
    game_name: "",
    streamer_name: "",
    viewers: "",
    video_url: "",
  });

  const [bannerImage, setBannerImage] = useState(null);
  const [streamerImage, setStreamerImage] = useState(null);

  const [bannerPreview, setBannerPreview] = useState(null);
  const [streamerPreview, setStreamerPreview] = useState(null);

  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStreams = async () => {
    const res = await axios.get(`${API}/livestream`);
    setStreams(res.data.data);
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleStreamerChange = (e) => {
    const file = e.target.files[0];
    setStreamerImage(file);
    setStreamerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("banner_image", bannerImage);
    data.append("streamer_image", streamerImage);

    setLoading(true);

    await axios.post(`${API}/livestream`, data);

    setLoading(false);
    fetchStreams();
  };

  return (
    <div className="admin-live-page">

      <h2>Create Live Stream</h2>

      <form className="live-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Stream Title"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="game_name"
          placeholder="Game Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="streamer_name"
          placeholder="Streamer Name"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="viewers"
          placeholder="Viewers"
          onChange={handleChange}
        />

        <input
          type="text"
          name="video_url"
          placeholder="Video URL"
          onChange={handleChange}
          required
        />

        <div className="upload-box">
          Banner Image
          <input type="file" onChange={handleBannerChange} required />
        </div>

        {bannerPreview && (
          <img className="preview-img" src={bannerPreview} alt="banner" />
        )}

        <div className="upload-box">
          Streamer Image
          <input type="file" onChange={handleStreamerChange} required />
        </div>

        {streamerPreview && (
          <img className="preview-img" src={streamerPreview} alt="streamer" />
        )}

        <button>
          {loading ? "Creating..." : "Create Live Stream"}
        </button>

      </form>

      <div className="stream-grid">
        {streams.map((stream) => (
          <div className="stream-card" key={stream.id}>

            <img
              src={`${API}/uploads/${stream.banner_image}`}
              alt="banner"
            />

            <div className="stream-info">
              <h3>{stream.title}</h3>
              <p>{stream.game_name}</p>
              <span>{stream.viewers} viewers</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminLiveStream;