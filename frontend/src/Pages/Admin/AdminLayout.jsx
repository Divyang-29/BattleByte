import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-wrapper">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <h2 className="logo">Admin Panel</h2>

        <nav>

          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/blogs">Blogs</NavLink>
          <NavLink to="/admin/advertisement">Advertisement</NavLink>
          <NavLink to="/admin/contact">Contact</NavLink>
          <NavLink to="/admin/faqs">FAQ</NavLink>
          <NavLink to="/admin/galary">Gallery</NavLink>
          <NavLink to="/admin/live-stream">Live Stream</NavLink>
          <NavLink to="/admin/privacy">Privacy</NavLink>
          <NavLink to="/admin/sponsor">Sponsor</NavLink>
          <NavLink to="/admin/team">Team</NavLink>
          <NavLink to="/admin/term">Terms</NavLink>
          <NavLink to="/admin/tournament">Tournament</NavLink>

          <NavLink to="/" className="website-link">
            Back to Website
          </NavLink>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="admin-main">

        <div className="admin-topbar">
          <h3>Welcome Admin</h3>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}