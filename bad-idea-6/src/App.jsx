import { Routes, Route, Link } from "react-router-dom";
import './index.css';
import Home from './components/Home';
import PostReview from "./components/PostReview";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";
import Login from "./components/Login";
import Register from "./components/register";
import Profile from "./components/Profile";
import EditPostPage from "./components/EditPostPage";
import LogOut from "./components/LogOut";


function App() {

  return (
    
    // <div id="cloud-container">
      <div id="container">
        <header>
          <h1>Good Idea / Bad Idea</h1>
        </header>
        <div id="navbar">
          <Link to="/"> Home </Link>
          <Link to="/AllReviews"> All Reviews </Link>
          <Link to="/newPost"> New Post </Link>
          <Link to="/loginPage"> Login</Link>
          <Link to="/register"> Register</Link>
          <LogOut/>
        </div>

        <div id="main-section">
          <Routes>
            <Route path="/newPost" element={<PostReview />} />
            <Route path="/loginPage" element={<Login />} />
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

