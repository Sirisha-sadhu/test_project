import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../redux/reducers/userSlice";

export default function ApprovedKycs() {
  const dispatch = useDispatch();
  const { kycDocs } = useSelector((state) => state.user || {});

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  // Filter approved users
  const approvedUsers = kycDocs.filter((u) => u.kycStatus === "approved");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-64 w-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Approved KYC Users</h1>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">User ID</th>
                <th className="p-3 border">KYC Emirates</th>
                <th className="p-3 border">Passport Front</th>
                <th className="p-3 border">Passport Back</th>
              </tr>
            </thead>
            <tbody>
              {approvedUsers.length > 0 ? (
                approvedUsers.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3 border">{u.user}</td>
                    <td className="p-3 border">
                      {u.emirates ? (
                        <a
                          href={u.emirates.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Emirates
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className="p-3 border">
                      {u.passportFront ? (
                        <a
                          href={u.passportFront.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Passport Front
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className="p-3 border">
                      {u.passportBack ? (
                        <a
                          href={u.passportBack.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          Passport Back
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No approved KYC users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {approvedUsers.length > 0 ? (
            approvedUsers.map((u) => (
              <div
                key={u._id}
                className="bg-white rounded-xl shadow-md p-5 border border-gray-200 flex flex-col gap-3 transition hover:shadow-lg"
              >
                <p>
                  <span className="font-semibold text-gray-700">User ID:</span> {u.user}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Emirates:</span>{" "}
                  {u.emirates ? (
                    <a
                      href={u.emirates.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Emirates
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Passport Front:</span>{" "}
                  {u.passportFront ? (
                    <a
                      href={u.passportFront.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Passport Front
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Passport Back:</span>{" "}
                  {u.passportBack ? (
                    <a
                      href={u.passportBack.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Passport Back
                    </a>
                  ) : (
                    "No file"
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No approved KYC users yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
