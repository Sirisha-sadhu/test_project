// import { useDispatch } from "react-redux";
// import { loginAdmin } from "../redux/adminSlice";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: "", password: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginAdmin(formData));
//     navigate("/dashboard");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         className="bg-white p-6 rounded-xl shadow-md w-96"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full mb-3 p-2 border rounded"
//           onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-3 p-2 border rounded"
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//         />
//         <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginAdmin } from "../redux/adminSlice";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (
//     email.trim().toLowerCase() === "admin@example.com" &&
//     password.trim() === "admin123"
//   ) {
//     dispatch(loginAdmin({ email }));
//     navigate("/dashboard"); // make sure route matches App.jsx
//   } else {
//     alert("Invalid credentials!");
//   }
// };


//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 p-3 border rounded-lg"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      dispatch(loginAdmin({ email }));
      navigate("/dashboard"); // ✅ fixed path
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
