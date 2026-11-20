import React, { useState } from "react";
import "./ContactSection.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message Sent Successfully 🔥");
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus("Something went wrong ❌");
      }
    } catch (error) {
      console.error("Contact error:", error);
      setStatus("Server error ❌");
    }
  };

  return (
    <section className="contact-wrapper">
      <div className="container">
        <h2 className="contact-heading text-center">Contact Us</h2>

        <form className="contact-form mt-5" onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-4">
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="contact-btn">
                Send Message
              </button>
            </div>

            {status && (
              <div className="col-12 text-center mt-3">
                <p className="contact-status">{status}</p>
              </div>
            )}

          </div>
        </form>
      </div>
    </section>
  );
}