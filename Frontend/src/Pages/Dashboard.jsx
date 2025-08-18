import React from "react";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600">
          Your KYC is submitted. You can explore your account here.
        </p>
      </div>
    </div>
  );
}
