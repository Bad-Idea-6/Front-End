import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASEURL, currentToken } from "./apiAdapters";

function EditPostPage() {
  const [ideaName, setIdeaName] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [token, setToken] = useState("");

  const pulledId = useParams();
const id = pulledId.reviewId
  console.log("made it into the webpage!!!");

  async function patchReview(event) {
    event.preventDefault();
    setToken(localStorage.getItem("token"));
    try {
      const response = await fetch(`${BASEURL}/reviews/editPost`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          ideaName,
          title,
          review,
          rating,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.log("PATCH review error", error);
    }
  }

  return (
    <>
      <div>
        <h1>Edit Post</h1>
        <form onSubmit={patchReview}>
          <input
            name="idea name"
            type="text"
            placeholder="Idea Name here..."
            onChange={(e) => {
              setIdeaName(e.target.value);
            }}
          />
          <input
            name="Title"
            type="text"
            placeholder="Title here..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            name="review"
            type="text"
            placeholder="Description here..."
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <input
            name="rating"
            type="number"
            min="1" max="5"
            placeholder="rating 1-5"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />

          <input type="submit" value={"submit"} />
        </form>
      </div>
    </>
  );
}

export default EditPostPage;
