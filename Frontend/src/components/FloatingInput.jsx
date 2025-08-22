
import { Field, ErrorMessage, useFormikContext } from "formik";

const FloatingInput = ({ label, type, name, value, errors, touched, ...props }) => {
   const { values } = useFormikContext(); // ✅ Access form values safely
  const isActive = values[name] && values[name].length > 0;

  return (
    <div className="relative w-full">
      <Field
        type={type}
        name={name}
        placeholder=" "
        {...props}
        className={`peer w-full px-4 py-2 border rounded-lg outline-none
          ${touched?.[name] && errors?.[name] 
            ? "border-red-500 focus:ring-red-500" 
            : "border-gray-300 focus:ring-blue-500"}`}
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
      {touched?.[name] && errors?.[name] && (
        <div className="text-red-500 text-sm mt-1">{errors?.[name]}</div>
      )}
    </div>
  );
};

export default FloatingInput;
