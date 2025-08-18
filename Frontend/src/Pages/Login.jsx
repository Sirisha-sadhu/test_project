import { useState } from "react";
import StepProgress from "../components/StepProgress";
import { useNavigate, Link } from "react-router-dom";
import FloatingInput from "@/components/FloatingInput";

export default function Login(setIsAuthenticated) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update form state
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      setIsAuthenticated(true);
      setStep(3); // Go to KYC
      navigate("/kyc");
    } else {
      alert("Invalid email or password!");
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 ">

      {/* Login Card */}
      <div className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        {/* Login Form */} 
        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FloatingInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-base text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg 
                       hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-red-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
