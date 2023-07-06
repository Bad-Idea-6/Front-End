import React from "react";
import { useState } from "react";
import {BASEURL} from "./apiAdapters";

export default function PostReview(){
    const [useIdeaName, setIdeaName] = useState("");
    const [useTitle, setTitle] = useState("")
    const [useAuthor, setAuthor] = useState("")
    const [useReview, setReview] = useState("")
    const [useRating, setRating] = useState("")



    const sendPostRequest = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${BASEURL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                     post: {
                        ideaName: useIdeaName,
                        title: useTitle,
                        author: useAuthor,
                        review: useReview,
                        setRating: useRating
                    }
                })
            });
            const data = await response.json();
            } catch (error) {
                console.log (error)
        }
    }



return (
    <>
    <div>
        <h1>create a new page</h1>
        <form>
            <input name="idea name" 
            type="text" 
            placeholder="Idea Name here..."
            onChange={(e)=>{
                setIdeaName(e.target.value)
            }} />
            <input name="Title" 
            type="text" 
            placeholder="Title here..."
            onChange={(e)=>{
                setTitle(e.target.value)
            }} />
            <input name="author" 
            type="text" 
            placeholder="Name here..."
            onChange={(e)=>{
                setAuthor(e.target.value)
            }} />
            <input name="review" 
            type="text" 
            placeholder="Description here..."
            onChange={(e)=>{
                setReview(e.target.value)
            }} />
            <input name="rating" 
            type="number" 
            placeholder="rating 1-5"
            onChange={(e)=>{
                setRating(e.target.value)
            }} />
            <button>
            <input type="submit" value={"submit"} onClick={()=> sendPostRequest()}/>
            </button>
        </form>
    </div>
    </>
)

}