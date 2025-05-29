import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
import aisiLogo from "../../assets/pictures/aisi-logo.png";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/themetoggle/Theme";

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
      {/* Logo animation: center fade-in, then move to top */}

      <ThemeToggle/>
      <motion.img
        src={aisiLogo}
        alt="AISI Logo"
        className="logo"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1 },              // Fade in first (1s)
          y: { delay: 1, duration: 0.5, ease: "easeIn" } // Then slide up (after 1s) with ease-in
        }}
      />


      {/* Form animation: fade in and slide up */}
      <motion.form
        onSubmit={handleLogin}
        className="form"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 1.7 }}
      >
        <div className="field-container">
          <h1>Login</h1>
          <div className="fields">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="fields">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Log in</button>
        </div>
      </motion.form>

    </main>
  );
}
