import React from "react";
import { useState,useEffect } from "react";
import {BASEURL, currentToken} from "./apiAdapters";
import { useNavigate } from "react-router-dom";

export default function Profile() {
const [userLogin, setUser] = useState({})
useEffect( ()=>{async function getMyGoshDarnInfo(){
  try {
    console.log("skdhgfiwsebgiueb")
    const response = await fetch(`${BASEURL}/user/profile`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify({
        id: localStorage.getItem("id")
    })
  
    });
    console.log("got to the json")
    const result = await response.json();
    console.log(result)
    setUser(result)
  } catch (error) {
    console.log("profile ERROR", error)
  }}
  getMyGoshDarnInfo()
  },[])
  
  return (
      <div className="Profile-Container">
        
        <img src="https://sjohart.files.wordpress.com/2013/07/good-idea-bad-idea.jpg"></img>
      </div>
    );
  }