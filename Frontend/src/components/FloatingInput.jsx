import { Formik, Form, Field, ErrorMessage } from "formik";

const FloatingInput = ({ label, type, name, value, ...props }) => {
  const isActive = value && value.length > 0; // keeps label up if there's data

  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        placeholder=" "
        {...props}
        className="peer w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        className={`absolute left-4 px-1 bg-white transition-all
          ${isActive
            ? "-top-2.5 text-sm text-blue-500"
            : "top-2 text-gray-400 text-base"}
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;