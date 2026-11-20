import React, { useEffect, useState } from "react";
import "./TermsPage.css";

export default function TermsPage() {
  const [terms, setTerms] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/terms")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setTerms(data.data[0]); // Take latest one
        }
      })
      .catch((err) => console.error("Terms fetch error:", err));
  }, []);

  if (!terms) return <div className="terms-wrapper">Loading...</div>;

  return (
    <section className="terms-wrapper">
      <div className="container">

        <p className="terms-date">
          This Terms of Service was last updated on{" "}
          {new Date(terms.created_at).toDateString()}
        </p>

        <h2 className="terms-title">{terms.title}</h2>

        <div className="terms-content">
          {terms.content.split("\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

      </div>
    </section>
  );
}