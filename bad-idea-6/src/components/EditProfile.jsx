import { useState, useEffect, React } from "react";
import { BASEURL, currentToken } from "./apiAdapters";
import { useNavigate } from "react-router-dom";
import RegisterUser from "./RegisterUser";

const EditProfile = (props) => {

  const setIsLoggedIn = props.setIsLoggedIn
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()


  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
        const result = await RegisterUser(password, eMail, firstName, lastName)
        console.log({result}, password, eMail)

        localStorage.setItem('token', result.token)
        setIsLoggedIn(true)

        navigate('/')
    }   catch (error) {
        console.log(error)
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
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditProfile;
