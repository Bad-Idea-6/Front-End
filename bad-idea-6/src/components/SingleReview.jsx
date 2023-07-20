import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASEURL } from "./apiAdapters";
import LeaveComment from "./LeaveComment";
import { currentToken } from "./apiAdapters";
import Report from "./Report";

const APIURL = BASEURL;

const SingleReview = () => {
  const [review, setReview] = useState(null);
  const [messages, setMessages] = useState([]);
  const { reviewId } = useParams();
  const storedUsername = localStorage.getItem("username");
  const storedIsAdmin = localStorage.getItem("is_admin");
  const navigate = useNavigate()
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
        const response = await fetch(
          `${APIURL}/messages/all-messages/${reviewId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const messagesData = await response.json();
        setMessages(messagesData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviewAndMessages();
    fetchMessages();
  }, [reviewId]);

  function ratingsAVG() {
    if (messages.length) {
      let numOfRatings = messages.length;
      let totalRatingsSum = 0;
      for (let i = 0; i < messages.length; i++) {
        totalRatingsSum += messages[i].rating;
      }
      return totalRatingsSum / numOfRatings;
    } else {
      return "N/A";
    }
  }
  async function deleteReview(id) {
    try {
      const response = await fetch(`${BASEURL}/delete/review`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          reviewId: reviewId,
          reviewOwnerId: id
        }),
      });
      const result = await response.json();
      navigate("/")
    } catch (error) {
      console.log(error);
    }
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
                  {review.author === storedUsername ||
                  storedIsAdmin === "true" ? (
                    <div>
                      <button>
                        <Link to={`/editPost/${review.reviewId}`}>
                          edit post
                        </Link>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteReview(review.authorId);
                        }}
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  ) : currentToken ? (
                    <div className="comment-container">
                      <LeaveComment id={review.reviewId} />
                    </div>
                  ) : (
                    <h2>Log In to leave a comment</h2>
                  )}
                  <Report id={review.reviewId} />
                </div>
                <h2 id="messages-text">Messages</h2>
                <div className="messages">
                  {messages.map((message) => (
                    <div key={message.messageId}>
                      <div className="center">
                        <div className="messageBox">
                          <p id="admin-text">"{message.message}"</p>
                          <p id="author-text">-{message.author}</p>
                          <p id="rating-text">Rating: {message.rating}</p>
                        </div>
                      </div>
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
