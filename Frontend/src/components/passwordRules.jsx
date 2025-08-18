import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";

const PasswordRules = ({ password }) => {
  const lengthValid = password.length >= 8;
  const lowerValid = /[a-z]/.test(password);
  const upperValid = /[A-Z]/.test(password);
  const numberValid = /[0-9]/.test(password);
  const specialValid = /[^A-Za-z0-9]/.test(password);

  const conditionsMet =
    [lowerValid, upperValid, numberValid, specialValid].filter(Boolean)
      .length == 4;

  const allValid = lengthValid && conditionsMet;

  return (
    <div className="bg-gray-50 p-3 rounded-lg border mt-2">
      {allValid && (
        <div className="bg-green-100 text-green-700 p-2 mb-2 rounded">
          ✅ Success!
        </div>
      )}
      <p className="text-sm font-medium">Your password must contain:</p>
      <ul className="text-sm mt-1 space-y-1 ">
        <li className={`flex items-center gap-2 ${lengthValid ? "text-green-600" : "text-red-500"}`}>
          {lengthValid? <FaCheckCircle/> : <FaTimesCircle/>} At least 8 characters
        </li>
        <li className={`flex items-center gap-2 ${lowerValid ? "text-green-600" : "text-red-500"}`}>
          {lowerValid? <FaCheckCircle/> : <FaTimesCircle/>} Lower case letters (a-z)
        </li>
        <li className={`flex items-center gap-2 ${upperValid ? "text-green-600" : "text-red-500"}`}>
          {upperValid? <FaCheckCircle/> : <FaTimesCircle/>} Upper case letters (A-Z)
        </li>
        <li className={`flex items-center gap-2 ${numberValid ? "text-green-600" : "text-red-500"}`}>
          {numberValid? <FaCheckCircle/> : <FaTimesCircle/>} Numbers (0-9)
        </li>
        <li className={`flex items-center gap-2 ${specialValid ? "text-green-600" : "text-red-500"}`}>
          {specialValid? <FaCheckCircle/> : <FaTimesCircle/>} Special characters (e.g. !@#$%^&*)
        </li>
      </ul>
    </div>
  );
};

export default PasswordRules;