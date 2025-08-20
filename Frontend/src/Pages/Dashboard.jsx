import React from "react";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Your KYC Documents are Submitted
        </h1>
        <p className="text-gray-600">
          Wait for documents validation
        </p>
      </div>
    </div>
  );
}