import React from "react";
import { useState } from "react";
import BASEURL from "./apiAdapters";


export default function userLogin() {
    const [usernameInput, setUsernameInput] =  useState("")
    const [passwordInput, setPasswordInput] =  useState("")


    const loginRequest = async (event) => {
        event.preventDefault()
        console.log(usernameInput, passwordInput)

        try {
                const response = await fetch(`${BASEURL}/user/login` , {
                    method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
    
                    username: usernameInput,
                    password: passwordInput

                })
            });

            console.log("passed")
            const data = await response.json()
                console.log(data)

                if (!data.token) {
                    console.log("Username or Password is incorrect")
                } 
                else {
                    localStorage.setItem ("token", data.data.token)
                    console.log("Login fired success")
                }
            
        } catch (error) {
            console.log("Login failed", error)
        }

    }
    return (
        <div>
            <h1> Login Here </h1>
            <form>
                <input name="Username"
                type="text"
                placeholder="Input Username Here"
                onChange={(e)=>{
                    setUsernameInput(e.target.value)
                    console.log(usernameInput)
                }}  />


                <input name="Password"
                type="text"
                placeholder="Input Password Here"
                onChange={(e)=>{
                    setPasswordInput(e.target.value)
                }} />

                    <button>
                    <input type="submit" value={"submit"} onClick={loginRequest} />
                    </button>

            </form>
        </div>
    )
}