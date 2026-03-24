import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./landing/home";
import AdminGuard from "./admin/AdminGuard";
import Login from "./admin/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sputnik/admin/login" element={<Login />} />
        <Route path="/sputnik/admin" element={<AdminGuard />} />
      </Routes>
    </Router>
  );
}

export default App;
