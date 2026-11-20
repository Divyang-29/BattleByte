import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminTeam.css";

function AdminTeam() {
  const API = "http://localhost:8080";

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    const res = await axios.get(`${API}/team`);
    setMembers(res.data.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Name and image required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    setLoading(true);
    await axios.post(`${API}/team`, formData);
    setLoading(false);

    setName("");
    setImage(null);
    setPreview(null);
    fetchMembers();
  };

  return (
    <div className="admin-team-container">
      <h1>Team Management</h1>

      {/* FORM */}
      <form className="team-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="file-label">
          Upload Image
          <input type="file" onChange={handleFileChange} required />
        </label>

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button>
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>

      {/* MEMBERS GRID */}
      <div className="team-grid">
        {members.map((member) => (
          <div className="team-card" key={member.id}>
            <img
              src={`${API}/uploads/${member.image_path}`}
              alt={member.name}
            />
            <h3>{member.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTeam;