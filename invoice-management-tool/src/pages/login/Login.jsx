import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
import aisiLogo from '../../assets/pictures/aisi-logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/main");
    } catch (err) {
      console.error("Login failed:", err.message || err);
    }
  };

  return (
    <main className="container">
      <img src={aisiLogo} alt="AISI Logo" className="logo" />
      <form onSubmit={handleLogin} className="form">
        <div className="field-container">
  
          <h1>Login</h1>
          <div className="fields">
            <label htmlFor="email">Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="fields">
            <label htmlFor="password">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit">Log in</button>
        </div>
      </form>
    </main>
  );
}
