
// import './App.css'

// function App() {
  

//   return (
//     <>
     
//     </>
//   )
// }

// export default App

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import Users from "./pages/Users";
// import Transactions from "./pages/Transactions";

// function App() {
//   const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AdminLogin />} />
//         <Route path="/dashboard" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />} />
//         <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/" />} />
//         <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Default route → Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Admin Login */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Protected Admin Panel */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<h1 className="p-6 text-red-600">404 - Page Not Found</h1>}
      />
    </Routes>
  );
}
