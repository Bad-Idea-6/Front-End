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
    <div class="Profile-Container">
      <div class="center">
      <h2>
        {user.username}'s Profile Page
      </h2>
      </div>
      <div class="profileCard">
      <h3>First Name: {user.firstName}</h3>
      <h3>Last Name: {user.lastName}</h3>
      <h3>Username: {user.username}</h3>
      <h3>Email: {user.email}</h3>

      <Link to={`/editProfile`}>
           <button >Edit Profile</button>
        </Link>
</div>
    </div>
  );
}
