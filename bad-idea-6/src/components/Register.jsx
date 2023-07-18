import React, { useState} from "react";
// import { registerUser } from ""//Update register User!!!!!!
import { useNavigate } from "react-router-dom"
import {BASEURL} from "./apiAdapters";
import RegisterUser from "./RegisterUser";

const Register = (props) => {
    const setToken = props.setToken
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [eMail, setEMail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            const result = await RegisterUser(username, password, eMail, firstName, lastName)
            console.log(result, username, password, eMail, "!!!!!!!!!!!!")
            console.log(result.result)


            localStorage.setItem('token', result.result.token)
            localStorage.setItem("id", result.result.userInfo.userId)
            localStorage.setItem("username", result.result.userInfo.username)
            localStorage.setItem("is_admin", false)
            setToken(result.result.token)

            navigate('/')
        }   catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
                   <div class="reviews-container">
                <div class="loginCard">
                    <div class="register">
            <div class="center">
            <h2>Register</h2>
            <h4>Registering is considered a Good Idea!</h4>
            </div>
            <form onSubmit={handleSubmit}>
            <div class="registerTextBox">
            <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                    }}
                />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                    }}
                />
                </label>
                <label>
                    E-Mail:
                    <input
                        type="text"
                        value={eMail}
                        onChange={(e) => {
                            setEMail(e.target.value);
                    }}
                />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                    }}
                />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </label>
                <button type='submit'>Submit</button>
                </div>
            </form>
        
        </div>
        </div>
        </div>
        </div>
    );
};

export default Register;