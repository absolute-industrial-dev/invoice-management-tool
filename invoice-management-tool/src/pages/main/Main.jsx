import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Main() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <main>
      <p>LOGOUT NOW</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={navigateToLogin}>Go to Login</button>
    </main>
  );
}
