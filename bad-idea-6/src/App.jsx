import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import PostReview from "./components/PostReview";
import AllReviews from "./components/AllReviews";
import SingleReview from "./components/SingleReview";

function App() {

  return (

    <div id ="container">
 <header>
        <h1>Good Idea / Bad Idea</h1>
        </header>
      <div id ="navbar">
        <Link to="/"> Home </Link>
        <Link to="/AllReviews"> All Reviews </Link>
      </div>
      
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newPost" element={<PostReview />} />
          <Route path="/AllReviews" element={<AllReviews />} />
        </Routes>
      </div>
    </div>

  )
}

export default App

