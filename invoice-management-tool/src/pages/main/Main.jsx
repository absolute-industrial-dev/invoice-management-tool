import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <main>
      <p>Go back to Login page.</p>
      <button onClick={navigateToLogin}>click me</button>
    </main>
  );
}
