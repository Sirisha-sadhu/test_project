import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import AdminLogin from "./pages/AdminLogin";
import { useState, useEffect } from "react";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("admin");

  useEffect(() => {
    setAuthenticated(!!token); // ✅ convert to boolean
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={authenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={authenticated ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions"
          element={authenticated ? <Transactions /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<h1 className="p-6 text-red-600">404 - Page Not Found</h1>}
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={1500} />
    </BrowserRouter>
  );
}
