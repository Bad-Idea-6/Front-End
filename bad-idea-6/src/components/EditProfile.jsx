import { useState, useEffect, React } from "react";
import { BASEURL, currentToken } from "./apiAdapters";
import { useNavigate } from "react-router-dom";
import RegisterUser from "./RegisterUser";

const EditProfile = () => {

  // const setIsLoggedIn = props.setIsLoggedIn
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()


  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
        const result = await RegisterUser(username, password, eMail, firstName, lastName)
        console.log({result}, password, eMail)

        localStorage.setItem('token', result.token)

        navigate('/')
    }   catch (error) {
        console.log("! Didnt change info !", error)
    }
}

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          E-Mail:
          <input
            type="text"
            value={eMail}
            onChange={(e) => setEMail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <br></br>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditProfile;
