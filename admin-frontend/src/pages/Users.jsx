
// // import Sidebar from "../components/Sidebar";
// // import { useSelector, useDispatch } from "react-redux";
// // import { approveUser, rejectUser } from "../redux/adminSlice";

// // export default function Users() {
// //   const users = useSelector((state) => state.admin?.users || []); 
// //   const dispatch = useDispatch();

// //   return (
// //     <div className="flex">
// //       <Sidebar />
// //       <div className="flex-1 p-6 overflow-x-auto">
// //         <h1 className="text-2xl font-bold mb-4">Users</h1>
// //         <table className="w-full border text-sm md:text-base">
// //           <thead className="bg-gray-200">
// //             <tr>
// //               <th className="p-2 border">Name</th>
// //               <th className="p-2 border">Email</th>
// //               <th className="p-2 border">KYC Docs</th>
// //               <th className="p-2 border">Status</th>
// //               <th className="p-2 border">Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {users.length > 0 ? (
// //               users.map((u) => (
// //                 <tr key={u.id} className="text-center">
// //                   <td className="p-2 border">{u.name}</td>
// //                   <td className="p-2 border">{u.email}</td>
// //                   <td className="p-2 border">
// //                     {u.kycFile ? (
// //                       <a
// //                         href={URL.createObjectURL(u.kycFile)}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="text-blue-600 underline"
// //                       >
// //                         View
// //                       </a>
// //                     ) : (
// //                       "No file"
// //                     )}
// //                   </td>
// //                   <td className="p-2 border">{u.status}</td>
// //                   <td className="p-2 border">
// //                     <button
// //                       className="bg-green-500 text-white px-3 py-1 rounded mr-2"
// //                       onClick={() => dispatch(approveUser(u.id))}
// //                     >
// //                       Approve
// //                     </button>
// //                     <button
// //                       className="bg-red-500 text-white px-3 py-1 rounded"
// //                       onClick={() => dispatch(rejectUser(u.id))}
// //                     >
// //                       Reject
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="5" className="p-4 text-center">
// //                   No users submitted yet.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }
// import Sidebar from "../components/Sidebar";
// import { useSelector, useDispatch } from "react-redux";
// import { approveUser, rejectUser } from "../redux/adminSlice";

// export default function Users() {
//   const users = useSelector((state) => state.admin?.users || []);
//   const dispatch = useDispatch();

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Sidebar collapses below md */}
//       <div className="md:w-64 w-full">
//         <Sidebar />
//       </div>

//       <div className="flex-1 p-4 md:p-6 overflow-x-auto">
//         <h1 className="text-xl md:text-2xl font-bold mb-4">Users</h1>

//         <div className="overflow-x-auto bg-white rounded-lg shadow">
//           <table className="w-full border text-xs sm:text-sm md:text-base">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Email</th>
//                 <th className="p-2 border">KYC Docs</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length > 0 ? (
//                 users.map((u) => (
//                   <tr key={u.id} className="text-center hover:bg-gray-50">
//                     <td className="p-2 border break-words">{u.name}</td>
//                     <td className="p-2 border break-words">{u.email}</td>
//                     <td className="p-2 border">
//                       {u.kycFile ? (
//                         <a
//                           href={URL.createObjectURL(u.kycFile)}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-blue-600 underline"
//                         >
//                           View
//                         </a>
//                       ) : (
//                         "No file"
//                       )}
//                     </td>
//                     <td className="p-2 border">{u.status}</td>
//                     <td className="p-2 border flex flex-col sm:flex-row justify-center gap-2">
//                       <button
//                         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs sm:text-sm"
//                         onClick={() => dispatch(approveUser(u.id))}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
//                         onClick={() => dispatch(rejectUser(u.id))}
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="p-4 text-center">
//                     No users submitted yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { approveUser, rejectUser } from "../redux/adminSlice";

export default function Users() {
  const users = useSelector((state) => state.admin?.users || []);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-full">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Users</h1>

        {/* ✅ Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">KYC Docs</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{u.name || "—"}</td>
                    <td className="p-2 border">{u.email || "—"}</td>
                    <td className="p-2 border">
                      {u.kycFile ? (
                        <a
                          href={URL.createObjectURL(u.kycFile)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className="p-2 border">{u.status || "Pending"}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                          onClick={() => dispatch(approveUser(u.id))}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          onClick={() => dispatch(rejectUser(u.id))}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No users submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Mobile Cards */}
        <div className="md:hidden space-y-4">
          {users.length > 0 ? (
            users.map((u) => (
              <div
                key={u.id}
                className="bg-white shadow rounded-lg p-4 border"
              >
                <p><span className="font-semibold">Name:</span> {u.name || "—"}</p>
                <p><span className="font-semibold">Email:</span> {u.email || "—"}</p>
                <p>
                  <span className="font-semibold">KYC Docs:</span>{" "}
                  {u.kycFile ? (
                    <a
                      href={URL.createObjectURL(u.kycFile)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
                <p><span className="font-semibold">Status:</span> {u.status || "Pending"}</p>

                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
                    onClick={() => dispatch(approveUser(u.id))}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                    onClick={() => dispatch(rejectUser(u.id))}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No users submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
