import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllReviews from "./AllReviews";
import { Link } from "react-router-dom";
import { BASEURL } from "./apiAdapters";
import EditPostPage from "./EditPostPage";

const APIURL = BASEURL;

const SingleReview = ({ SingleReview }) => {
  const [review, setReview] = useState(null);
  const { reviewId } = useParams();

  useEffect(() => {
    async function fetchAllReviews() {
      try {
        const response = await fetch(`${BASEURL}/reviews/singlePost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: reviewId,
          }),
        });
        console.log("got to the json");
        const result = await response.json();
        setReview(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllReviews();
  }, []);

  // console.log (review.reviewId)

  return (
    <>
      <div class="reviews-container">
        <div class="reviewCard">
          <div class="center">
          <h1>Single Post Page</h1>
          </div>
          <div class="SingleReview">
            {review && review.reviewId ? (
              <div classname="Single-Review">
                <div class="center">
                <h3>{review.title}</h3>
                <h3>{review.ideaName}</h3>
                <p>{review.review}</p>
                <h3>User: {review.author}</h3>
                <h3>Rating: {review.rating}</h3>
                {/* <img src={rev.imageUrl}></img> */}
                <button>
                  {" "}
                  <Link to={`/editPost/${review.reviewId}`}>edit post</Link>
                </button>
              </div>
              </div>
            ) : (
              <h2> Loading... </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleReview;
