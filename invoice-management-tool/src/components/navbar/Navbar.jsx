import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

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
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
}

/* import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div class="header">
      <div class="logo">Company Title</div>
      <div class="menu">
        <a href="#" class="link">
          <div class="title" onClick={handleLogout}>
            Logout
          </div>
          <div class="bar"></div>
        </a>
      </div>
    </div>
  );
}
 */
