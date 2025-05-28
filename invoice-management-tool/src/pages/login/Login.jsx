import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      /* const result = await invoke("login", { username, password }); */

      console.log("Login complete!");
      navigate("/main");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <main className="container">
      <p>hello, login now below pls</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
