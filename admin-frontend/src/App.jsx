import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import AdminLogin from "./pages/AdminLogin";


export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={
            <AdminDashboard />
        }/>
      <Route path="/users" element={
          
            <Users />
          
        } />
      <Route path="/transactions" element={
          
            <Transactions />
          
        } />
      <Route path="*" element={<h1 className="p-6 text-red-600">404 - Page Not Found</h1>}/>
    </Routes>
    <ToastContainer position="top-center" autoClose={1500} />
  </BrowserRouter>
  );
}
