import { FaUserPlus, FaEnvelopeSquare, FaIdCard, FaTachometerAlt } from "react-icons/fa";

export default function StepProgress({ currentStep }) {
  const steps = [
    { label: "Register", icon: <FaUserPlus /> },
    { label: "Verify Email", icon: <FaEnvelopeSquare /> },
    { label: "KYC", icon: <FaIdCard /> },
    { label: "Dashboard", icon: <FaTachometerAlt /> },
  ];

  return (
    <div className="flex justify-between items-center w-full max-w-2xl mx-auto m-8">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex flex-col items-center relative">
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
          <p
            className={`mt-2 text-sm ${
              currentStep === index + 1
                ? "text-blue-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            {step.label}
          </p>
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
  );
}
