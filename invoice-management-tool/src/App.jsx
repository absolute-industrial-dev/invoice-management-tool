import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, loading } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/main" /> : <Login />} />
      <Route path="/main" element={user ? <Main /> : <Navigate to="/" />} />
    </Routes>
  );
}
