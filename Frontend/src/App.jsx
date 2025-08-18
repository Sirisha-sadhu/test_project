
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import KYC from "./pages/KYC";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [Step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register setStep={setStep} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setStep={setStep} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/kyc" element={isAuthenticated ? <KYC setStep={setStep} /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
