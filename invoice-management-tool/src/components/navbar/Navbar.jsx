import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";
import mainLogo from "../../assets/pictures/absolute-logo.png";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="nav-container">
      <div>
        <img src={mainLogo} alt="logo" className="logo-container" />
      </div>
      <div className="email-container">
        {user ? <span>{user.email}</span> : <span></span>}
      </div>
      <div className="home-wrapper">
        <button to="/main" className="home-container">
          Home
          <div className="inner-button">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                  fill="#ffffff"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </button>
      </div>
      <div className="logout-container">
        {user ? (
          <>
            <button onClick={logout} className="logout-button">
              <FiLogOut size={23} />
              <span>Log out</span>
            </button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
}
