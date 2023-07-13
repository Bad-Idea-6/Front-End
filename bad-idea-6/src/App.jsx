import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import PostReview from "./components/PostReview";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";
import Login from "./components/Login";
import Register from "./components/register";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import EditPostPage from "./components/EditPostPage";
import Logout from "./components/Logout";
import Admin from "./components/Admin";
import { currentToken } from "./components/apiAdapters";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("is_admin") === "true"
  );
  const location = useLocation();

  const showAdminPanel = location.pathname === "/editProfile" && isAdmin;

  return (
    <div id="container">
      <header>
        <h1>Good Idea / Bad Idea</h1>
      </header>
      <div id="navbar">
        <Link to="/">Home</Link>
        <Link to="/AllReviews">All Reviews</Link>

        {token && token.length ? (
          <>
            {showAdminPanel && <Link to="/admin">Admin Panel</Link>}
            <Logout setToken={setToken} />
            <Link to="/newPost">New Post</Link>
            <Link to="/profile">Edit Profile</Link>
          </>
        ) : (
          <>
            <Link to="/loginPage">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      <div id="main-section">
        <Routes>
          <Route path="/newPost" element={<PostReview />} />
          <Route path="/loginPage" element={<Login setToken={setToken} />} />
          <Route path="/" element={<AllReviews />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/post/:reviewId" element={<SingleReview />} />
          <Route path="/editPost/:reviewId" element={<EditPostPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
