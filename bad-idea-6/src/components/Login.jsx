import React from "react";
import { useState } from "react";
import { BASEURL } from "./apiAdapters";
import { useNavigate } from "react-router-dom";

export default function userLogin(props) {
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const navigate = useNavigate()

    const loginRequest = async (event) => {
        event.preventDefault()
        console.log(usernameInput, passwordInput)

        try {
            const response = await fetch(`${BASEURL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    username: usernameInput,
                    password: passwordInput

                })
            });

            const data = await response.json();
            console.log(data)

            if (!data.success) {
                console.log("Username or Password is incorrect")
            }
            else {
                localStorage.setItem("token", data.token)
                localStorage.setItem("id", data.id)
                props.setToken(data.token)
                if (data.is_admin) {
                    console.log("is_admin")
                    localStorage.setItem("is_admin", data.is_admin)
                }
                console.log("Login fired success")
                navigate("/")
            }

        } catch (error) {
            console.log("Login failed", error)
        }

    }
    return (
        <div>
            <div class="reviews-container">
                <div class="loginCard">
                    <div class="login">
                        <h1> Login Here </h1>
                        <form>
                            <div class="loginTextBox">
                                <input name="Username"
                                    type="text"
                                    placeholder="Input Username Here"
                                    onChange={(e) => {
                                        setUsernameInput(e.target.value)
                                        console.log(usernameInput)
                                    }} />


                                <input name="Password"
                                    type="text"
                                    placeholder="Input Password Here"
                                    onChange={(e) => {
                                        setPasswordInput(e.target.value)
                                    }} />
                            </div>
                            <div class="button-gap">
                                <button onClick={loginRequest}>
                                    <input type="submit" value={"submit"} onClick={loginRequest} />
                                </button>


                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setUsernameInput("admin")
                                    setPasswordInput("password")
                                }
                                }
                                >Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}