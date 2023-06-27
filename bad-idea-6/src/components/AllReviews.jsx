import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SingleReview from "./SingleReview";
import BASEURL from "./apiAdapters";


export default function AllReviews() {
    const APIURL = BASEURL;
    const [review, setReview] = useState([])
    useEffect(() => {
        async function fetchAllReviews() {
            try {
                const response = await fetch(`${APIURL}/reviews`) //// need api url here
                const translatedData = await response.json();
                setReview(translatedData) /// .posts may need changed depending on api
                console.log(translatedData)
                //console.log(allPosts)
            } catch (error) {
                console.log(error, "Fetch all reviews");
            }
        }
        fetchAllReviews();
    }, [])
    return (

        <div class="reviews-container">
            {
                review.map((review, idx) => {
                    return (

                        <div key={idx}>
                            <div className="review">
                                <h3>{review.title}</h3>
                                <h4>User: {review.author}</h4>
                                <h4>{review.ideaName}</h4>
                                <h4>{review.review}</h4>
                                <h2>Rating: {review.rating}</h2>
                                {/* <img src={player.imageUrl}></img> */}
                                {/* <Link to={`/SingleReview/${review.reviewId}`}>
                                    <button >Click Here for more details</button>
                                </Link> */}
                                {/* <button onClick={() => setReview }>
                                </button> */}
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

