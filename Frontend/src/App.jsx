
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import KYC from "./Pages/KYC";
import Dashboard from "./Pages/Dashboard";
import EmailVerify from "./Pages/EmailVerify";
import PhoneVerify from "./Pages/PhoneVerify";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [Step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const token = JSON.parse(localStorage.getItem("user_token"));


  useEffect(() => {
    const fetchProfile = async () => {

    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (response.data.success) {
      setUser(response.data.data);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    } catch (error) {
      console.error("Error fetching user profile:", error);   
      setIsAuthenticated(false);
    }
  }
  fetchProfile();
}, [token]);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<Register setStep={setStep} />} />
        <Route path="/verify-phone" element={<PhoneVerify setStep={setStep} user={user}/>} />
        <Route path="/verify-email" element={<EmailVerify user={user} setStep={setStep}/>} />
        <Route path="/kyc" element={<KYC setStep={setStep} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
        <ToastContainer position="top-center" autoClose={1500} />
    </Router>
  );
}

