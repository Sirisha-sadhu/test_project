// export default function Transactions() {
//   return (
//     <div className="flex">
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold">Transactions</h1>
//         <p className="mt-4">Here you can show all user transactions (demo placeholder).</p>
//       </div>
//     </div>
//   );
// }
import Sidebar from "../components/Sidebar";

export default function Transactions() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="mt-4">
          Here you can show all user transactions (demo placeholder).
        </p>
      </div>
    </div>
  );
}
