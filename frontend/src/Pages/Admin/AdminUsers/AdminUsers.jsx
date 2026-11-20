import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-users">

      <h2>Users Management</h2>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>

              <td>
                <strong>{user.username}</strong>
              </td>

              <td>{user.email}</td>

              <td>{user.phone || "—"}</td>

              <td>
                <span
                  className={`role-badge ${
                    user.role === "admin"
                      ? "role-admin"
                      : "role-user"
                  }`}
                >
                  {user.role}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}