import React, { useEffect, useState } from "react";
import "./FAQSection.css";

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/faq")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data.data || []);
      })
      .catch((err) => {
        console.error("FAQ fetch error:", err);
        setFaqs([]);
      });
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-wrapper">
      <div className="container">
        <h2 className="faq-heading text-center">
          Frequently Asked Questions
        </h2>

        <div className="faq-list mt-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h5>{faq.title}</h5> {/* ✅ FIXED */}
                <span>{activeIndex === index ? "▲" : "▼"}</span>
              </div>

              <div
                className={`faq-answer ${
                  activeIndex === index ? "show" : ""
                }`}
              >
                <p>{faq.content}</p> {/* ✅ FIXED */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}