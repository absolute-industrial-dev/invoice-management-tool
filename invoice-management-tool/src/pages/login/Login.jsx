import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

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
      <p>Login</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
