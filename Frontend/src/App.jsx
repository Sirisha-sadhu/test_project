
// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import KYC from "./pages/KYC";
// import Dashboard from "./pages/Dashboard";
// import EmailVerify from "./Pages/EmailVerify";
// import PhoneVerify from "./Pages/PhoneVerify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile } from "./redux/actions/registerActions";


// const ProtectedRoute = ({ element: Component, condition, redirectTo, ...rest }) => {
//   if (!condition) {
//     return <Navigate to={redirectTo} replace />;
//   }
//   return <Component {...rest} />;
// };


// export default function App() {
//   const [Step, setStep] = useState(1);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const token = localStorage.getItem("register");

//   const {userInfo} = useSelector((state) => state.register ) 
//   const dispatch = useDispatch();

//   console.log(userInfo, "app.js")
//   useEffect(() => {
//     dispatch(fetchUserProfile());
// }, [token]);
  

// console.log(userInfo)

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
//         <Route path="/register" element={<Register setStep={setStep} />} />
//         <Route path="/verify-phone" element={userInfo?.emailVerified ? <PhoneVerify setStep={setStep} user={userInfo} /> : <Navigate to='/verify-email'/>}/>
//         <Route path="/verify-email" element={userInfo ? <EmailVerify user={userInfo} setStep={setStep}/> : <Navigate to="/register"/>} />
//         <Route path="/kyc" element={userInfo?.phoneVerified ? <KYC setStep={setStep} user={userInfo} /> : <Navigate to='/verify-phone'/>} />
//         <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//       </Routes>
//         <ToastContainer position="top-center" autoClose={1500} />
//     </Router>
//   );
// }



import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
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
              condition={isAuthenticated}
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
          path="/dashboard"
          element={
            <ProtectedRoute
              condition={userInfo?.isKycDocsUploaded}
              redirectTo="/kyc"
              element={Dashboard}
            />
          }
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={1500} />
    </Router>
  );
}
