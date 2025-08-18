// import { FaUserPlus, FaEnvelopeSquare, FaIdCard, FaTachometerAlt, FaPhoneAlt } from "react-icons/fa";

// export default function StepProgress({ currentStep }) {
//   const steps = [
//     { label: "Register", icon: <FaUserPlus /> },
//     { label: "Verify Email", icon: <FaEnvelopeSquare /> },
//     {label: "Verify Phone", icon: <FaPhoneAlt />},
//     { label: "KYC", icon: <FaIdCard /> },
//     { label: "Dashboard", icon: <FaTachometerAlt /> },
//   ];

//   return (
//     <div className="flex justify-between items-center w-full max-w-2xl mx-auto m-8">
//       {steps.map((step, index) => (
//         <div key={index} className="flex-1 flex flex-col items-center relative">
//           <div
//             className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
//               currentStep === index + 1
//                 ? "bg-blue-500 text-white border-blue-500"
//                 : currentStep > index + 1
//                 ? "bg-green-500 text-white border-green-500"
//                 : "bg-white text-gray-400 border-gray-300"
//             }`}
//           >
//             {step.icon}
//           </div>
//           <p
//             className={`mt-2 text-sm ${
//               currentStep === index + 1
//                 ? "text-blue-500 font-semibold"
//                 : "text-gray-500"
//             }`}
//           >
//             {step.label}
//           </p>
//           {index < steps.length - 1 && (
//             <div
//               className={`absolute top-6 left-1/2 w-full h-1 -z-10 ${
//                 currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
//               }`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
import {
  FaUserPlus,
  FaEnvelopeSquare,
  FaIdCard,
  FaTachometerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function StepProgress({ currentStep }) {
  const steps = [
    { label: "Register", icon: <FaUserPlus /> },
    { label: "Verify Email", icon: <FaEnvelopeSquare /> },
    { label: "Verify Phone", icon: <FaPhoneAlt /> },
    { label: "KYC", icon: <FaIdCard /> },
    { label: "Dashboard", icon: <FaTachometerAlt /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-6">
      {/* ✅ For larger screens (horizontal) */}
      <div className="hidden sm:flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Step circle */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep === index + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : currentStep > index + 1
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {step.icon}
            </div>
            {/* Step label */}
            <p
              className={`mt-2 text-sm text-center ${
                currentStep === index + 1
                  ? "text-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </p>
            {/* Line connector */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-6 left-1/2 w-full h-1 -z-10 ${
                  currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ✅ For mobile screens (vertical) */}
      <div className="flex flex-col gap-6 sm:hidden">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center relative">
            {/* Step circle */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep === index + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : currentStep > index + 1
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {step.icon}
            </div>
            {/* Step label */}
            <p
              className={`ml-3 text-sm ${
                currentStep === index + 1
                  ? "text-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </p>
            {/* Line connector */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-5 top-10 h-6 w-1 -z-10 ${
                  currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
