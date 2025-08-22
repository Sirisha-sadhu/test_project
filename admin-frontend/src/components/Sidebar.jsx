import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-2"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          // ❌ Close (X) icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // ☰ Menu icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 bg-gray-800 text-white 
          h-full md:h-screen w-64 p-6 transform 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <NavLink to="/dashboard" className="block hover:underline">
            Dashboard
          </NavLink>
          <NavLink to="/users" className="block hover:underline">
            Users
          </NavLink>
          <NavLink to="/transactions" className="block hover:underline">
            Transactions
          </NavLink>
          <NavLink to="/approvedKyc" className="block hover:underline">
            ApprovedKYC
          </NavLink>
          <NavLink to="/rejectedKyc" className="block hover:underline">
            RejectedKyc
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
