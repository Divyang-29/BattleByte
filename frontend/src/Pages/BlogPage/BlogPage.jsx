import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogPage.css";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Blog fetch error:", err));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="blog-wrapper">
      <div className="container">
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-card"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <div className="blog-image">
                <img
                  src={`http://localhost:8080/uploads/${blog.primary_image}`}
                  alt="blog"
                />
              </div>

              <div className="blog-content">
                <h4>{blog.short_description}</h4>
                <p className="blog-meta">
                  BattleByte Sport · {formatDate(blog.publish_date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}