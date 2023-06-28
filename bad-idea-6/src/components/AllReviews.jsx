import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SingleReview from "./SingleReview";
import BASEURL from "./apiAdapters";
// import SearchBar from "./SearchBar";


export default function AllReviews() {
    const APIURL = BASEURL;
    const [review, setReview] = useState([])
    let [searchQuery, setSearchQuery] = useState("");
    let filteredReviews = review.filter((singleReview) => {
        let lowercasedName = singleReview.ideaName.toLowerCase();
        let lowercasedQuery = searchQuery.toLowerCase();

        if (lowercasedName.includes(lowercasedQuery)) {

            return singleReview

        }
    })
    useEffect(() => {
        async function fetchAllReviews() {
            try {
                const response = await fetch(`${APIURL}/reviews`) //// need api url here
                const translatedData = await response.json();
                setReview(translatedData) /// .posts may need changed depending on api
                console.log(translatedData)
                console.log(review)
            } catch (error) {
                console.log(error, "Fetch all reviews");
            }
        }
        fetchAllReviews();
    }, [])
    return (

        <div>
            <form>
                <label htmlFor="search-query">Search: </label>
                <input
                    name="search-query"
                    type="text"
                    placeholder="Search Here"
                    value={searchQuery}
                    onChange={(handleChange) => {
                        ///  console.log(bananas.target.value)
                        setSearchQuery(handleChange.target.value)
                    }}
                ></input>
            </form>
            <div class="reviews-container">
            {
                filteredReviews.length ? filteredReviews.map((Review, idx) => {
                    return (
                        <div key={idx}>
                            <div className="review">
                            <h3>{Review.title}</h3>
                            <h4>User: {Review.author}</h4>
                            <h4>{Review.ideaName}</h4>
                            <h4>{Review.review}</h4>
                            <h2>Rating: {Review.rating}</h2>
                            <Link to={`/SingleReview/${Review.reviewId}`}>
                                <button >Click Here For More Details</button>
                            </Link>
                            </div>
                        </div>
                    )
                }) : <p>Loading...</p>
            }
            </div>
        </div>
    )
}


//         <div class="reviews-container">
//             {
//                 review.map((review, idx) => {
//                     return (

//                         <div key={idx}>
//                             <div className="review">
//                                 <h3>{review.title}</h3>
//                                 <h4>User: {review.author}</h4>
//                                 <h4>{review.ideaName}</h4>
//                                 <h4>{review.review}</h4>
//                                 <h2>Rating: {review.rating}</h2>
//                                 {/* <img src={player.imageUrl}></img> */}
//                                 {/* <Link to={`/SingleReview/${review.reviewId}`}>
//                                     <button >Click Here for more details</button>
//                                 </Link> */}
//                                 {/* <button onClick={() => setReview }>
//                                 </button> */}
//                             </div>
//                         </div>

//                     )
//                 })
//             }
//         </div>
//     )
// }

