import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASEURL } from "./apiAdapters";
import { currentToken } from "./apiAdapters";
const APIURL = BASEURL;

const SingleReview = () => {
  const [review, setReview] = useState(null);
  const [messages, setMessages] = useState([]);
  const { reviewId } = useParams();
  const storedUsername = localStorage.getItem("username")
  const storedIsAdmin = localStorage.getItem("is_admin")
  useEffect(() => {
    async function fetchReviewAndMessages() {
      try {
        const response = await fetch(`${APIURL}/reviews/singlePost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: reviewId,
          }),
        });
        const reviewData = await response.json();
        setReview(reviewData);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchMessages() {
      try {
        const response = await fetch(`${APIURL}/messages/all-messages/${reviewId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const messagesData = await response.json();
        setMessages(messagesData);

        console.log(messages, "sdjhdusahdnsdjsdjnsjdnjsadn")

      } catch (error) {
        console.log(error);
      }
    }
    fetchReviewAndMessages();
    fetchMessages();
  }, [reviewId]);

  function ratingsAVG () {
   let numOfRatings = messages.length
   let totalRatingsSum = 0
   for (let i = 0; i<messages.length; i++){
    totalRatingsSum += messages[i].rating
   }
   return totalRatingsSum / numOfRatings
}

return (
  <>
    <div className="reviews-container">
      <div className="reviewCard">
        <div className="SingleReview">
          {review && review.reviewId ? (
            <div className="Single-Review">
              <div className="center">
                <h3>{review.title}</h3>
                <h3>{review.ideaName}</h3>
                <p>{review.review}</p>
                <h3>User: {review.author}</h3>
                <h3>Average Rating: {ratingsAVG()}</h3>
                {/* <img src={rev.imageUrl}></img> */}
                {review.author === storedUsername || storedIsAdmin === "true"?
                  <button>
                    <Link to={`/editPost/${review.reviewId}`}>edit post</Link>
                  </button>
                  : currentToken? <div className="comment-container"><LeaveComment id={review.reviewId}/></div> 
                  : <h2>Log In to leave a comment</h2>
                  }
              </div>
              <h2 id="messages-text">Messages</h2>
              <div className="messages">
                {messages.map((message) => (
                  <div key={message.messageId}>
                    <p id="admin-text">{message.message}</p>
                    <p id="author-text">Author: {message.author}</p>
                    <p id="rating-text">Rating: {message.rating}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  </>
);
};

export default SingleReview;
