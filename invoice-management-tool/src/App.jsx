import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { useEffect } from "react";
import { monitorDueDate } from "./lib/invoiceService";

export default function App() {
  const { user, loading } = useAuth();

  /* useEffect(() => {
    const checkDueDate = async () => {
      await monitorDueDate();
    };

    checkDueDate();
  }, []);
 */
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Routes>
      <Route path="/" element={user ? <Navigate to="/main" /> : <Login />} />
      <Route path="/main" element={user ? <Main /> : <Navigate to="/" />} />
    </Routes>
    <Toaster position="bottom-right"/>
    </>
  );
}
