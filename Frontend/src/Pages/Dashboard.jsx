// src/pages/Dashboard.jsx
// export default function Dashboard() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-green-100">
//       <h1 className="text-3xl font-bold text-green-700">
//         Welcome to Dashboard
//       </h1>
//     </div>
//   );
// }
import StepProgress from "../components/StepProgress";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center p-4">
      <StepProgress currentStep={4} />
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-lg text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Welcome to Dashboard 🎉</h2>
        <p>Your account is now fully verified!</p>
      </div>
    </div>
  );
}
