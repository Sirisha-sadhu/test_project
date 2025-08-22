
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/reducers/adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { success, error, loading } = useSelector((state) => state.admin);

  console.log(success, error)

  useEffect(()=>{
    if(success){
      toast.success('Successfull Login')
      navigate('/dashboard')
    }
    else{
      toast.error(error)
    }
      
  }, [success, error, dispatch])

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

    console.log(formData)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(formData));
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
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Loading' : "login"}
        </button>
      </form>
    </div>
  );
}
