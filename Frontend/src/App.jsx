
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import KYC from "./pages/KYC";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./Pages/EmailVerify";
import PhoneVerify from "./Pages/PhoneVerify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./redux/actions/registerActions";
export default function App() {
  const [Step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("register");

  const {userInfo} = useSelector((state) => state.register ) 
  const dispatch = useDispatch();

  console.log(userInfo, "app.js")
  useEffect(() => {
    dispatch(fetchUserProfile());
}, [token]);
  

console.log(userInfo)

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<Register setStep={setStep} />} />
        <Route path="/verify-phone" element={userInfo?.emailVerified ? <PhoneVerify setStep={setStep} user={userInfo} /> : <Navigate to='/verify-email'/>}/>
        <Route path="/verify-email" element={userInfo ? <EmailVerify user={userInfo} setStep={setStep}/> : <Navigate to="/register"/>} />
        <Route path="/kyc" element={userInfo?.phoneVerified ? <KYC setStep={setStep} user={userInfo} /> : <Navigate to='/verify-phone'/>} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
        <ToastContainer position="top-center" autoClose={1500} />
    </Router>
  );
}
