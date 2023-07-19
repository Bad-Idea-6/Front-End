import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { BASEURL } from "../apiAdapters";
import AdminReportPage from "./AdminReportPage";
import "./admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [howMany, setHowMany] = useState(users.length);
  const [reset, setReset] = useState(1);
  // const [userInQuestion, setUserInQuestion] = useState("")
  const adminAuth = localStorage.getItem("is_admin");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchAllUsers() {
      console.log(howMany);
      try {
        const response = await fetch(`${BASEURL}/admin/all-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        console.log("got to the json");
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUsers();
  }, [reset]);
  console.log(adminAuth);

  async function createAdmin(id) {
    try {
      const response = await fetch(`${BASEURL}/admin/make-admin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adminId: id,
        }),
      });
      const result = await response.json();
      setReset(reset + 1)
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(userId) {
    try {
      const response = await fetch(`${BASEURL}/delete/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userInQuestionId: userId,
        }),
      });
      const result = await response.json();
      setUsers(result);
      setReset(reset + 1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {adminAuth ? (
        <div>
          <h1>Admin control panel</h1>
          <Link to={"/admin-review"}>
            <button>Report Overview</button>
          </Link>

          {users && users.length ? (
            users.map((user, idx) => {
              return (
                <div className="admin_user_container" key={user.userId}>
                  <h3>{user.firstName}</h3>
                  <h3>{user.lastName}</h3>
                  <h3>{user.username}</h3>
                  <h3>{user.email}</h3>
                  {user.is_admin ? (
                    <div>
                      <h3>Is Admin</h3>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteUser(user.userId);
                        }}
                      >
                        Delete
                      </button>
                      <button onClick={(e) => {
                        e.preventDefault();
                        createAdmin(user.userId);
                      }}>
                        Make Admin</button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div> </div>
          )}
        </div>
      ) : (
        <h1>You are not an admin</h1>
      )}

      <div id="extra-sections">
        <Routes>
          <Route path="/admin-review" element={<AdminReportPage />} />
        </Routes>
      </div>

    </>
  );
};

export default Admin;
