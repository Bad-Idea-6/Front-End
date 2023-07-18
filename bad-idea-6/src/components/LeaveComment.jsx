import { useState } from "react";
import { BASEURL } from "./apiAdapters";

export default function LeaveComment(props) {
  const reviewId = props.id;

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [ideaName, setIdeaName] = useState("");
  const [rating, setRating] = useState("");
  const token = localStorage.getItem("token");

  async function sendComment(e) {

    try {
      e.preventDefault();
      console.log(message, reviewId,rating, ideaName, title)

        const response = await fetch(`${BASEURL}/messages/leave-comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message,
            reviewId,
            rating,
            ideaName,
            title,
          }),
        });
        console.log("this is response", response);
        const data = await response.json();
        console.log(data, "this is send comment data");
      } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div id="comment-form">
        <form onSubmit={sendComment}>
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
            name="message"
            type="text"
            placeholder="Leave Comment here"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <input
            name="rating"
            type="number"
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
