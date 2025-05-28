import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}
