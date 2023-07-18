import { Link } from 'react-router-dom';
import { BASEURL } from "./apiAdapters";


export default function Logout(props) {
  const handleLogout = () => {
    localStorage.clear()
    props.setToken("")

  };

  return (
    <Link to="/">
    <button onClick={handleLogout}>
      <input class="center" type="submit" value={"Logout"} onClick={handleLogout} />
    </button>
  </Link>
  );
}


