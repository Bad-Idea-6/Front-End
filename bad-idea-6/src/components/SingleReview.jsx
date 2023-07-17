import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASEURL } from "./apiAdapters";

const APIURL = BASEURL;

const SingleReview = () => {
  const [review, setReview] = useState(null);
  const [messages, setMessages] = useState([]);
  const { reviewId } = useParams();

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
        const response = await fetch(`${APIURL}/messages/allMessages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewId: reviewId,
          }),
        });
        const messagesData = await response.json();
        setMessages(messagesData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchReviewAndMessages();
    fetchMessages();
  }, [reviewId]);

  return (
    <>
      <div className="reviews-container">
        <div className="reviewCard">
          <div className="center">
            <h1>Single Post Page</h1>
          </div>
          <div className="SingleReview">
            {review && review.reviewId ? (
              <div className="Single-Review">
                <div className="center">
                  <h3>{review.title}</h3>
                  <h3>{review.ideaName}</h3>
                  <p>{review.review}</p>
                  <h3>User: {review.author}</h3>
                  <h3>Rating: {review.rating}</h3>
                  {/* <img src={rev.imageUrl}></img> */}
                  <button>
                    <Link to={`/editPost/${review.reviewId}`}>edit post</Link>
                  </button>
                </div>
                <div className="messages">
                  {messages.map((message) => (
                    <div key={message.messageId}>
                      <p>{message.message}</p>
                      <p>Author: {message.author}</p>
                      <p>Rating: {message.rating}</p>
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
