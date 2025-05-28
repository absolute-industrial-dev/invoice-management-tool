import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { invoke } from "@tauri-apps/api/core";

export default function Main() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <main>
      <p>LOGOUT NOW</p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
