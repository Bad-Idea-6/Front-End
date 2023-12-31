import { Link } from 'react-router-dom';
import { BASEURL } from "./apiAdapters";


export default function Logout(props) {
  const handleLogout = () => {
    localStorage.clear()
    props.setToken("")
    window.location.reload(false);

  };

  return (
    <Link to="/">
      <button onClick={handleLogout}>
        <input className="center" type="submit" value={"Logout"} onClick={handleLogout} />
      </button>
    </Link>
  );
}


