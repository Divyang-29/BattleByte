import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminContact.css";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-contact-page">
      <h2>Contact Messages</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.id}</td>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.phone || "-"}</td>
              <td>{msg.subject}</td>
              <td className="message-cell">{msg.message}</td>
              <td>
                {new Date(msg.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}