import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FloatingInput from "@/components/FloatingInput";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/actions/loginActions";

export default function Login(setIsAuthenticated) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(userLogin(formData))
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
