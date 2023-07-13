import React, { useState, useEffect } from "react";
import { BASEURL } from "./apiAdapters";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASEURL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data.users);
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  const updateUser = async (userId, isAdmin) => {
    try {
      const response = await fetch(`${BASEURL}/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isAdmin }),
      });
      if (response.ok) {
        // User updated successfully
        fetchUsers();
      } else {
        // Handle error
        console.log("Error updating user");
      }
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {isAdmin ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    onChange={() => updateUser(user.id, !user.isAdmin)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You do not have admin privileges.</p>
      )}
    </div>
  );
};

export default Admin;
