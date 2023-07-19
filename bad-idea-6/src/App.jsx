import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import PostReview from "./components/PostReview";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";
import EditPostPage from "./components/EditPostPage";
import Logout from "./components/LogOut";
import Admin from "./components/admin/AdminUserPage";
import AdminReportPage from "./components/admin/AdminReportPage";
import { currentToken } from "./components/apiAdapters";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("is_admin") === "true"
  );
  const [isLoggedIn, setIsLoggedIn] = useState("false")

  const location = useLocation();

  // const showAdminPanel = location.pathname === "/editProfile" && isAdmin;

  return (
    <div id="container">
      <header>
        <h1>Good Idea / Bad Idea</h1>
      </header>
      <div id="navbar">
        <Link to="/">Home</Link>

        {/* {token && token.length && isAdmin ? (<Link to="/admin">Admin Panel</Link>) : (" ") } */}

        {token && token.length ? (
          <>
            {isAdmin ? (<Link to="/admin">Admin Panel</Link>) : (" ")}

            <Link to="/newPost">New Post</Link>
            <Link to="/viewProfile">View Profile</Link>
            <Logout setToken={setToken} />
          </>
        ) : (
          <>

            <Link to="/register">Register</Link>
            <Link to="/loginPage">Login</Link>
          </>
        )}
      </div>

      <div id="main-section">
        <Routes>
          <Route path="/newPost" element={<PostReview />} />
          <Route path="/loginPage" element={<Login setToken={setToken} />} />
          <Route path="/" element={<AllReviews />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/post/:reviewId" element={<SingleReview />} />
          <Route path="/editPost/:reviewId" element={<EditPostPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-review" element={<AdminReportPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
