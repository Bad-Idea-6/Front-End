import { useState } from "react";
import { BASEURL } from "./apiAdapters";


const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the RegisterUser function here passing the email and password values
    RegisterUser(password, email)
      .then((data) => {
        console.log(data);
        // Handle the result or redirect to a success page
      })
      .catch((error) => {
        console.log(error);
        // Handle the error or display an error message
      });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          E-Mail:
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditProfile;
