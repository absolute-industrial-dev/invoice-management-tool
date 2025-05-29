import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err.message || err);
    }
  };

  return (
    <nav>
      <div>Logo</div>
      <div>
        <Link to="/main">Home</Link>
      </div>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
}
