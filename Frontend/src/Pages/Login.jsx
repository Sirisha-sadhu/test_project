import { useState } from "react";
import StepProgress from "../components/StepProgress";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setStep, setIsAuthenticated }) {
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

  // Reusable floating input
  const FloatingInput = ({ label, type, name, value, onChange }) => {
    const isActive = value && value.length > 0;

    return (
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className="peer w-full p-3 rounded-lg bg-white/70 border border-gray-300 
                     focus:outline-none focus:border-blue-500"
          required
        />
        <label
          className={`absolute left-4 px-1 bg-white transition-all duration-200 ${
            isActive
              ? "-top-2.5 text-sm text-blue-500"
              : "top-2 text-gray-400 text-base"
          } peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500`}
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center p-4">
      {/* Step Progress */}
      <StepProgress currentStep={2} />

      {/* Login Card */}
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

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
              className="text-sm text-blue-200 hover:underline"
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
        <p className="text-center text-white mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-yellow-300 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
