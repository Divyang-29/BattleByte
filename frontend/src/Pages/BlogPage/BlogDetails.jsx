import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetails.css";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [sidebar, setSidebar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Blog detail error:", err));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs/sidebar")
      .then((res) => res.json())
      .then((data) => setSidebar(data))
      .catch((err) => console.error("Sidebar error:", err));
  }, []);

  if (!blog) return <div className="blog-detail-wrapper">Loading...</div>;

  const section = blog.sections?.[0];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="blog-detail-wrapper">
      <div className="container blog-layout">
        {/* LEFT CONTENT */}
        <div className="blog-main">
          <img
            className="blog-hero"
            src={`http://localhost:8080/uploads/${section?.image1}`}
            alt="hero"
          />

          <div className="blog-meta">
            BattleByte Sport · {formatDate(blog.publish_date)} · No Comment
          </div>

          <h1 className="blog-title">{section?.title}</h1>

          <p>{section?.description}</p>

          {/* QUOTE */}
          <div className="blog-quote">{section?.quote}</div>

          <p>{section?.text_content}</p>

          <img
            className="blog-image2"
            src={`http://localhost:8080/uploads/${section?.image2}`}
            alt="blog"
          />

          {/* TAGS + SHARE */}
          <div className="blog-footer-row">
            <div>
              <strong>Tags:</strong>{" "}
              {blog.tags?.map((tag) => tag.title).join(", ")}
            </div>

            <div className="share-icons">
              Share:
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>

          {/* COMMENT FORM */}
          <div className="comment-box">
            <h3>Leave a reply</h3>

            <div className="form-row">
              <input placeholder="Name*" />
              <input placeholder="Email*" />
            </div>

            <input placeholder="Website" />
            <textarea placeholder="Your Comment" rows="5"></textarea>

            <button className="submit-btn">Submit</button>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="blog-sidebar">
          {/* SEARCH */}
          <div className="sidebar-search">
            <input placeholder="Search here..." />
            <i className="fas fa-search"></i>
          </div>

          {/* CATEGORIES */}
          <div className="sidebar-block">
            <h4>Categories</h4>
            <div className="divider"></div>

            {sidebar?.categories.map((cat) => (
              <div key={cat.id} className="category-item">
                <span className="red-dot"></span>
                {cat.title}
              </div>
            ))}
          </div>

          {/* POPULAR POSTS */}
          <div className="sidebar-block">
            <h4>Popular Posts</h4>
            <div className="divider"></div>

            {sidebar?.popularBlogs.map((blog) => (
              <div key={blog.id} className="popular-post">
                <img
                  src={`http://localhost:8080/uploads/${blog.primary_image}`}
                  alt=""
                />
                <div>
                  <p>{blog.short_description}</p>
                  <span>
                    {new Date(blog.publish_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* TAGS */}
          <div className="sidebar-block">
            <h4>Popular Tags</h4>
            <div className="divider"></div>

            <div className="tag-list">
              {sidebar?.tags.map((tag) => (
                <span key={tag.id}>{tag.title}</span>
              ))}
            </div>
          </div>

          {/* UPCOMING MATCH */}
          {sidebar?.matches?.length > 0 && (
            <div className="sidebar-block">
              <h4>Upcoming Match</h4>
              <div className="divider"></div>

              {sidebar.matches.map((match) => (
                <div key={match.id} className="match-row">
                  <img
                    src={`http://localhost:8080/uploads/${match.image1}`}
                    alt=""
                  />
                  <span className="vs-text">VS</span>
                  <img
                    src={`http://localhost:8080/uploads/${match.image2}`}
                    alt=""
                  />
                  <div className="match-date">
                    {new Date(match.match_date).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADVERTISEMENT */}
          {sidebar?.advertisement && (
            <div className="sidebar-block">
              <img
                className="sidebar-ad"
                src={`http://localhost:8080/uploads/${sidebar.advertisement.image}`}
                alt="Advertisement"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
