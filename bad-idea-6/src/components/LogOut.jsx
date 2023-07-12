export default function Logout() {
    const handleLogout = () => {
     localStorage.clear()
     window.location.reload();
    };
  
    return (
      <button onClick={handleLogout}>
        Logout
      </button>
    );
  }
  

