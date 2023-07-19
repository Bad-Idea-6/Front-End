import React from "react";
import { useState } from "react";
import { BASEURL } from "./apiAdapters";
import { useNavigate } from "react-router-dom";

export default function PostReview() {
    const [useIdeaName, setIdeaName] = useState("");
    const [useTitle, setTitle] = useState("")
    const [useReview, setReview] = useState("")
    const [useRating, setRating] = useState("")
    const author = localStorage.getItem("username")
    const navigate = useNavigate()

    const sendPostRequest = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        console.log(token)
        try {
            const response = await fetch(`${BASEURL}/reviews/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ideaName: useIdeaName,
                    title: useTitle,
                    author,
                    review: useReview,
                    rating: useRating
                })
            });
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <div className="center">
                <h1>Creat New Post</h1>
                <div className="reviewTextBox">
                    <form className="newPost" onSubmit={sendPostRequest}>
                        <input name="idea name"
                            type="text"
                            placeholder="Idea Name here..."
                            onChange={(e) => {
                                setIdeaName(e.target.value)
                            }} />
                        <input name="Title"
                            type="text"
                            placeholder="Title here..."
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }} />

                        <input name="rating"
                            type="number"
                            min="1" max="5"
                            placeholder="rating 1-5"
                            onChange={(e) => {
                                setRating(e.target.value)
                            }} />

                        <input name="review"
                            type="text" id="reviewDesc"
                            placeholder="Description here..."
                            onChange={(e) => {
                                setReview(e.target.value)
                            }} />
                        <input type="submit" value={"submit"} />

                    </form>
                </div>
            </div>
        </>
    )

}