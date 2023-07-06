import React, { useState} from "react";
// import { registerUser } from ""//Update register User!!!!!!
import { useNavigate } from "react-router-dom"
import {BASEURL} from "./apiAdapters";
import RegisterUser from "./RegisterUser";

const Register = (props) => {
    const setIsLoggedIn = props.setIsLoggedIn
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
            console.log({result}, username, password, eMail, "!!!!!!!!!!!!")

            localStorage.setItem('token', result.token)
            setIsLoggedIn(true)

            navigate('/')
        }   catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    );
};

export default Register;