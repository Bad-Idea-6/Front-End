import React from "react";
import { useState, useEffect } from "react";
import { BASEURL, currentToken } from "./apiAdapters";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getMyGoshDarnInfo() {
      try {
        console.log("fired use effect");
        const response = await fetch(`${BASEURL}/user/profile`, {
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
    getMyGoshDarnInfo();
  }, []);

  return (
    <div class="Profile-Container">
      <h1>
        welcome {user.firstName} {user.lastName}
      </h1>
      <h3>username {user.username}</h3>

      <img src="https://sjohart.files.wordpress.com/2013/07/good-idea-bad-idea.jpg"></img>
    </div>
  );
}
