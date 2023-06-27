import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllReviews from "./AllReviews";
import { Link } from 'react-router-dom';
import BASEURL from "./apiAdapters";

const APIURL = BASEURL;


const SingleReview = ({ review }) => {
    const [rev, setRev] = useState(null)
    const { reviewId } = useParams()

    useEffect(() => {
        async function fetchAllReviews() {
            try {
                const response = await fetch(`${APIURL}/Reviews/${reviewId}`) //// need api url here
                const translatedData = await response.json();
                setRev(translatedData) /// .posts may need changed depending on api
                //  console.log(translatedData)
                console.log(Review)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllReviews();
    }, [])


    console.log(id)

    return (
        <>
            {

                reviewId && reviewId.name ?

                    <div className="Single-Review">
                        <h2>{rev.title}
                        </h2>
                        <h3>User: {rev.author}</h3>
                        <h3>{rev.ideaName}</h3>
                        {/* <img src={rev.imageUrl}></img> */}
                    </div> : null
            }
        </>
    )
}
export default SingleReview