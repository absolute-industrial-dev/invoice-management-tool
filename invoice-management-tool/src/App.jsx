import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/main" /> : <Login />} />
      <Route path="/main" element={user ? <Main /> : <Navigate to="/" />} />
    </Routes>
  );
}
