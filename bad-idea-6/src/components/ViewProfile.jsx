import { useState, useEffect, React } from "react";
import { BASEURL, currentToken } from "./apiAdapters";
import { useNavigate, Link } from "react-router-dom";


export default function viewProfile() {

  const [user, setUser] = useState({});
  useEffect(() => {
    async function gettingInfoView() {
      try {
        console.log("fired use effect");
        const response = await fetch(`${BASEURL}/user/Profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
          body: JSON.stringify({
            id: localStorage.getItem("id"),
          }),
        });
        console.log("got to the json");
        const result = await response.json();
        console.log(result);
        setUser(result);
        // console.log(user.)
      } catch (error) {
        console.log("profile ERROR", error);
      }
    }
    gettingInfoView();
  }, []);

  return (
    <div className="Profile-Container">
      <div className="center">
      <h2>
        {/* Make if statement incase no username */}
        {user.username}'s Profile Page
      </h2>
      </div>
      <div className="profileCard">
      <div id="first-name-text">First Name: {user.firstName ? (user.firstName) : `! Please Add First Name !` } </div>
      <div id="last-name-text">Last Name:  {user.lastName ? (user.lastName) : `! Please Add Last Name !` } </div>
      <div id="username-text">Username: {user.username ? (user.username) : `! Please Add Username !` } </div>
      <div id="email-text">Email: {user.email ? (user.email) : `! Please Add Email !` } </div>

      {/* <div id="post-amount-text">  {user. ? (user.) : `No Posts` } </div> */}

      <Link to={`/editProfile`}>
           <button >Edit Profile</button>
        </Link>
</div>
    </div>
  );
}
