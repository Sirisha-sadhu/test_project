

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import MainDashboard from "./pages/MainDashboard";

import WaitingPage from "./Pages/WaitingPage";
import Dashboard from "./Pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PhoneVerify from "./pages/PhoneVerify";
import EmailVerify from "./pages/EmailVerify";
import KYC from "./pages/KYC";
import { fetchUserProfile } from "./redux/actions/registerActions";

// ✅ Reusable ProtectedRoute
const ProtectedRoute = ({ condition, redirectTo, element: Component, ...rest }) => {
  return condition ? <Component {...rest} /> : <Navigate to={redirectTo} />;
};

export default function App() {
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("register");

  const { userInfo } = useSelector((state) => state.register);
  const dispatch = useDispatch();

  console.log(userInfo)
  useEffect(() => {
    if (token) dispatch(fetchUserProfile());
  }, [token, dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register setStep={setStep} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              condition={userInfo?.isKycDocsUploaded}
              redirectTo="/login"
              element={Dashboard}
            />
          }
        />
        <Route
          path="/verify-email"
          element={
            <ProtectedRoute
              condition={!!userInfo}
              redirectTo="/register"
              element={EmailVerify}
              user={userInfo}
              setStep={setStep}
            />
          }
        />
        <Route
          path="/verify-phone"
          element={
            <ProtectedRoute
              condition={userInfo?.emailVerified}
              redirectTo="/verify-email"
              element={PhoneVerify}
              user={userInfo}
              setStep={setStep}
            />
          }
        />
        <Route
          path="/kyc"
          element={
            <ProtectedRoute
              condition={userInfo?.phoneVerified}
              redirectTo="/verify-phone"
              element={KYC}
              user={userInfo}
              setStep={setStep}
            />
          }
        />
        <Route
          path="/wait"
          element={
            <ProtectedRoute
              condition={userInfo?.isKycDocsUploaded}
              redirectTo="/kyc"
              element={WaitingPage}
            />
          }
        />
        <Route
  path="/maindashboard"
  element={
    <ProtectedRoute
      condition={userInfo?.kycStatus === "approved"}
      redirectTo="/kyc" // or wherever pending users should go
      element={MainDashboard}
    />
  }
/>
      </Routes>
      


      <ToastContainer position="top-center" autoClose={1500} />
    </Router>
  );
}
