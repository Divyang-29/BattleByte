import React from "react";
import "./Banner.css";

export default function Banner({ title, breadcrumb, bgImage }) {
  return (
    <div
      className="page-banner d-flex align-items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container">
        <div className="banner-content">
          <h1 className="banner-title">{title}</h1>
          <p className="banner-breadcrumb">{breadcrumb}</p>
        </div>
      </div>
    </div>
  );
}