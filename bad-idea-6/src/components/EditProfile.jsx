import React, { useState } from "react";
import { BASEURL } from "./apiAdapters";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASEURL}/user/editProfile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Handle success
        console.log("Profile updated successfully");
      } else {
        // Handle error
        console.log("Error updating profile");
      }
    } catch (error) {
      console.log(error);
    }
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
