import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    countryCode: "+91",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Form submitted:", formData);
    // Send to backend
  };

  const FloatingInput = ({ label, type, name, value, onChange }) => (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <label
        className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                   peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <FloatingInput
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <FloatingInput
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* DOB + Gender */}
          <div className="flex flex-col sm:flex-row gap-4">
            <FloatingInput
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <div className="relative w-full">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="peer w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="" hidden></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label
                className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all 
                           peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                           peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Gender
              </label>
            </div>
          </div>

          {/* Email */}
          <FloatingInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Country Code + Phone */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+81">🇯🇵 +81</option>
              <option value="+971">🇦🇪 +971</option>
            </select>
            <FloatingInput
              label="Phone Number"
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
 <div className="flex flex-col sm:flex-row gap-4">
          {/* Password */}
          <FloatingInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          <FloatingInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
</div>
          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
