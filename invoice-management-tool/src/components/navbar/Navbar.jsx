import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";
import mainLogo from "../../assets/pictures/absolute-logo.png";
import { FiLogOut } from "react-icons/fi";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "../themetoggle/Theme";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="nav-container">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

        <div className="logo-container">
          <img src={mainLogo} alt="logo" className="logo-icon" />
        </div>

        {user && (
        <div className="nav-right-section">
          <ThemeToggle className="theme-icon" />

          <div className="profile-wrapper">
            <div className="email-container" onClick={toggleDropdown}>
              <span>{user.email}</span>
              <ChevronDownIcon className="chevron-icon"/>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="logout-button">
                  <FiLogOut size={18} />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}



      {/* <div className="home-wrapper">
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
      </div> */}

      {!user && (
        <div className="logout-container">
          <Link to="/">Login</Link>
        </div>
      )}
    </nav>
  );
}
