import React, { useState, useEffect } from "react";
import { BASEURL } from "../apiAdapters";
import "./admin.css";
import { currentToken } from "../apiAdapters";

export default function AdminReportPage() {
  const [allReview, setAllReview] = useState([]);
  const [reset, setReset] = useState(1);

  useEffect(() => {
    async function fetchAllReviews() {
      const APIURL = BASEURL;
      try {
        const response = await fetch(`${APIURL}/reviews`);
        const translatedData = await response.json();
        setAllReview(translatedData);
      } catch (error) {
        console.log("ERROR withFetch all reviews", error);
      }
    }
    fetchAllReviews();
  }, [reset]);

  async function deleteReview(Id) {
    try {
      const response = await fetch(`${BASEURL}/delete/review`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          reviewId: Id,
        }),
      });
      const result = await response.json();
      setReset(reset + 1);
    } catch (error) {
      console.log(error);
    }
  }
  async function resolveReport(Id) {
    console.log("you pushed a button")
    try {
      const response = await fetch(`${BASEURL}/admin/resolve-report`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          reviewId: Id,
        }),
      });
      console.log("did this work?")
      const result = await response.json();
      setReset(reset + 1);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div>
        <h1 className="center">Reported Posts</h1>
        {allReview && allReview.length ? (
          allReview.map((rev, idx) => {
            // console.log(rev);

            return (
              <>
                {rev.reported ? (
                  <>
                    <div id="review-report-container" key={idx}>
                      <h3>{rev.author}</h3>
                      <h3 id="textWrap">{rev.review}</h3>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteReview(rev.reviewId);
                        }}>Delete</button>
                      <button
                        onClick={(e) => {
                          e.preventDefault
                          resolveReport(rev.reviewId)
                        }}
                      >Resolve</button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </>
  );
}
