import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { updateUserKyc, userDetails } from "../redux/reducers/userSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { kycDocs } = useSelector((state) => state.user || {});

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  // Filter only pending users
  const pendingUsers = kycDocs.filter((u) => u.kycStatus === "pending");

  const handleKycUpdate = (id, status) => {
    dispatch(updateUserKyc({ id, status }));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="md:w-64 w-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Pending Users</h1>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">User ID</th>
                <th className="p-2 border">KYC Emirates</th>
                <th className="p-2 border">Passport Front</th>
                <th className="p-2 border">Passport Back</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.length > 0 ? (
                pendingUsers.map((u) => (
                  <tr key={u._id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{u.user}</td>
                    <td className="p-2 border">
                      {u.emirates ? (
                        <a
                          href={u.emirates.url}
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
                          href={u.passportFront.url}
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
                          href={u.passportBack.url}
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
                    <td className="p-2 border capitalize">{u.kycStatus}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                          onClick={() => handleKycUpdate(u._id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          onClick={() => handleKycUpdate(u._id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600">
                    No pending users.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {pendingUsers.length > 0 ? (
            pendingUsers.map((u) => (
              <div
                key={u._id}
                className="bg-white shadow rounded-lg p-4 border flex flex-col gap-2"
              >
                <p>
                  <span className="font-semibold">User ID:</span> {u.user}
                </p>
                <p>
                  <span className="font-semibold">KYC Emirates:</span>{" "}
                  {u.emirates ? (
                    <a
                      href={u.emirates.url}
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
                  <span className="font-semibold">Passport Front:</span>{" "}
                  {u.passportFront ? (
                    <a
                      href={u.passportFront.url}
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
                  <span className="font-semibold">Passport Back:</span>{" "}
                  {u.passportBack ? (
                    <a
                      href={u.passportBack.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Passport Back
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="capitalize">{u.kycStatus}</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm flex-1"
                    onClick={() => handleKycUpdate(u._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm flex-1"
                    onClick={() => handleKycUpdate(u._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No pending users.</p>
          )}
        </div>
      </div>
    </div>
  );
}
