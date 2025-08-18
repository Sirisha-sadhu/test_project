// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Login from './pages/login.jsx';
// import Home from './pages/Home.jsx';
// import Register from './pages/Register.jsx';

// function App() {
  
//   const routers = createBrowserRouter([
//   { path: "/", element: <Home /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
// ]);

//   return (
//     <RouterProvider router={routers}>

//     </RouterProvider>
//   );
    
// }

// export default App;


// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

// const router = createBrowserRouter([
//   { path: "/", element: <Login /> },
//   { path: "/login", element: <Login /> },
//   { path: "/register", element: <Register /> },
//   { path: "/dashboard", element: <Dashboard /> }, // ✅ This is important
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }


import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import KYC from "./Pages/KYC";
import Dashboard from "./Pages/Dashboard";
import EmailVerify from "./Pages/EmailVerify";
import PhoneVerify from "./Pages/PhoneVerify";
import { ToastContainer } from "react-toastify"; // ✅ import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // ✅ include CSS

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
        {/* <Route path="/kyc" element={<KYC setStep={setStep} />} /> */}
        <Route path="/kyc" element={<KYC setStep={setStep} setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1500} />

    </Router>
  );
}

