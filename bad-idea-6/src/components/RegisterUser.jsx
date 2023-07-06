import BASEURL from "./apiAdapters";
const BASE_URL = BASEURL;

const RegisterUser = async (username, password, email, firstName, lastName) => {
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
          
        }),
      });
  
      const result = await response.json();
    
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  export default RegisterUser