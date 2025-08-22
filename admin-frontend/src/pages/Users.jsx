
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateUserKyc, userDetails } from "../redux/reducers/userSlice";

export default function Users() {
  const users = useSelector((state) => state.admin?.users || []);
  const dispatch = useDispatch();

  const {loading, success, error, kycDocs, kycStatus} = useSelector((state)=> state.user || {})

  useEffect(()=>{
    dispatch(userDetails())
  }, [dispatch])

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
                <th className="p-2 border">User_Id</th>
                <th className="p-2 border">KYC Emirates</th>
                <th className="p-2 border">KYC Passport Front</th>
                <th className="p-2 border">KYC Passport Back</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {kycDocs.length > 0 ? (
                kycDocs.map((u) => (
                  <tr key={u._id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{u.user}</td>
                    <td className="p-2 border">
                      {u.emirates ? (
                        <a
                          href={u.emirates?.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Emirates
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className="p-2 border">
                      {u.passportFront ? (
                        <a
                          href={u.passportFront?.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Passport Front
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className="p-2 border">
                      {u.passportBack ? (
                        <a
                          href={u.passportBack?.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Passport Back
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className="p-2 border">{u.kycStatus}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                          onClick={() => dispatch(updateUserKyc({id:u._id, status:'approved'}))}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          onClick={() => dispatch(updateUserKyc({id:u._id, status:'rejected'}))}
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
          {kycDocs.length > 0 ? (
            kycDocs.map((u) => (
              <div
                key={u._id}
                className="bg-white shadow rounded-lg p-4 border"
              >
                <p><span className="font-semibold">Name:</span> {u.user || "—"}</p>
                <p>
                  <span className="font-semibold">KYC Emirates:</span>{" "}
                  {u.emirates ? (
                    <a
                      href={u.emirates?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Emirates
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
                 
                 <p>
                  <span className="font-semibold">KYC PassportFront:</span>{" "}
                  {u.passportFront ? (
                    <a
                      href={u.passportFront?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Passport Front
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
                <p>
                  <span className="font-semibold">KYC PassportBack:</span>{" "}
                  {u.passportBack ? (
                    <a
                      href={u.passportBack?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      passportBack
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
                <p><span className="font-semibold">Status:</span> {u.kycStatus || "Pending"}</p>

                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm"
                    onClick={() => dispatch(updateUserKyc({id:u._id, status:'approved'}))}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                    onClick={() => dispatch(updateUserKyc({id:u._id, status:'rejected'}))}
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
