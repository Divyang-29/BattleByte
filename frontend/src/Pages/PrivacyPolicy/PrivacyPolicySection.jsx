import React, { useEffect, useState } from "react";
import "./PrivacyPolicySection.css";

export default function PrivacyPolicySection() {
  const [privacy, setPrivacy] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/privacy")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setPrivacy(data.data[0]); // since count = 1
        }
      })
      .catch((err) => {
        console.error("Privacy fetch error:", err);
      });
  }, []);

  if (!privacy) return null;

  return (
    <section className="privacy-wrapper">
      <div className="container">

        <p className="privacy-updated">
          This Privacy Policy was last updated on{" "}
          {new Date(privacy.created_at).toLocaleDateString()}
        </p>

        <h2 className="privacy-title">
          {privacy.title}
        </h2>

        <div className="privacy-content-box">
          <p>{privacy.content}</p>
        </div>

      </div>
    </section>
  );
}