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
