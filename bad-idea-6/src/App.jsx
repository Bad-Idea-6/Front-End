import { Routes, Route, Link } from "react-router-dom";
import './index.css';
import Home from './components/Home';
import PostReview from "./components/PostReview";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditPostPage from "./components/EditPostPage";
import LogOut from "./components/LogOut";
import { currentToken } from "./components/apiAdapters";
import { useState } from "react";

function App() {

 console.log(currentToken)
 const [token, setToken] = useState(localStorage.getItem("token"));
 console.log(token)

  return (
    
    // <div id="cloud-container">
      <div id="container">
        <header>
          <h1>Good Idea / Bad Idea</h1>
        </header>
        <div id="navbar">
          <Link to="/"> Home </Link>
          <Link to="/AllReviews"> All Reviews </Link>

         
            
              {token && token.length ?
              <>
              <LogOut setToken={setToken} />
              <Link to="/newPost"> New Post </Link>
              </>:
              <>
              <Link to="/loginPage"> Login</Link>
              <Link to="/register"> Register</Link>

              </>
              }

            
        </div>

        <div id="main-section">
          <Routes>
            <Route path="/newPost" element={<PostReview />} />
            <Route path="/loginPage" element={<Login setToken={setToken} />} /> 
            <Route path="/" element={<AllReviews />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:reviewId" element={<SingleReview />} />
            <Route path="/newPost" element={<PostReview />} />
            <Route path="/editPost/:reviewId" element={<EditPostPage />} />
          </Routes>
        </div>
      </div>
    // </div>
   
  )
}

export default App

