export default function Logout(props) {
    const handleLogout = () => {
     localStorage.clear()
     props.setToken("")

    };
  
    return (
      <button onClick={handleLogout}>
        Logout
      </button>
    );
  }
  

