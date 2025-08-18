
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import KYC from "./pages/KYC";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./Pages/EmailVerify";
import PhoneVerify from "./Pages/PhoneVerify";

export default function App() {
  const [Step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<Register setStep={setStep} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/verify-phone" element={<PhoneVerify setStep={setStep}/>} />
        <Route path="/verify-email" element={<EmailVerify setStep={setStep}/>} />
        <Route path="/kyc" element={<KYC setStep={setStep} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
