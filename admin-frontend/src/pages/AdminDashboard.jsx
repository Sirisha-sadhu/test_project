// import Sidebar from "../components/Sidebar";

// export default function AdminDashboard() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <div className="grid grid-cols-3 gap-6 mt-6">
//           <div className="p-6 bg-white rounded-xl shadow">Total Users: 10</div>
//           <div className="p-6 bg-white rounded-xl shadow">Approved: 6</div>
//           <div className="p-6 bg-white rounded-xl shadow">Pending: 4</div>
//         </div>
//       </div>
//     </div>
//   );
// }
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white rounded-xl shadow">Total Users: 10</div>
          <div className="p-6 bg-white rounded-xl shadow">Approved: 6</div>
          <div className="p-6 bg-white rounded-xl shadow">Pending: 4</div>
        </div>
      </div>
    </div>
  );
}
