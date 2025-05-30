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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <div className="icon-email-container">
        <div className="logo-container">
          <img src={mainLogo} alt="logo" className="logo-icon" />
        </div>
        <div className="email-container">
          {user ? <span>{user.email}</span> : <span></span>}
        </div>
      </div>
      <div className="home-wrapper">
        <button to="/main" className="home-container">
          Home
          <div className="inner-button">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"></path>{" "}
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

