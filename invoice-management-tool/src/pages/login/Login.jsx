import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";
import aisiLogo from "../../assets/pictures/aisi-logo.png";
import { motion } from "framer-motion";
import ThemeToggle from "../../components/themetoggle/Theme";
import ParticleBackground from "../../components/particles/Particles";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const toastId = toast.loading("Logging in...");
    
    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login successful!", { id: toastId });
        navigate("/main");
      } else {
        toast.error("Invalid credentials", { id: toastId });
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.message || "Login failed. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <main className="container">
      <ThemeToggle className="theme-login"/>
      <motion.img
        src={aisiLogo}
        alt="AISI Logo"
        className="logo"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1 },
          y: { delay: 1, duration: 0.5, ease: "easeIn" }
        }}
      />

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 1.7 }}
      >
        <div className="field-container">
          <h1>Login</h1>
          <div className="fields">
            <label htmlFor="email"><EnvelopeIcon className="icon" />Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="fields">
            <label htmlFor="password"><LockClosedIcon className="icon"/>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Log in</button>
        </div>
      </motion.form>
      <ParticleBackground/>
    </main>
  );
}