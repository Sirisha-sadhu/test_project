import StepProgress from "../components/StepProgress";
import { useNavigate } from "react-router-dom";

export default function KYC({ setStep }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center p-4">
      <StepProgress currentStep={3} />
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">KYC Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/70 focus:outline-none"
            required
          />
          <input
            type="file"
            className="w-full p-3 rounded-lg bg-white/70 focus:outline-none"
            required
          />
          <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit KYC
          </button>
        </form>
      </div>
    </div>
  );
}
