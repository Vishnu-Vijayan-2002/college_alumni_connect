import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AlumniRequests() {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userID = localStorage.getItem("userId"); // saved during login

  useEffect(() => {
    if (userID) {
      fetchRequests();
    }
  }, [userID]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/placement-cell/get-request");
      const allRequests = res.data || [];

      // ✅ handle both cases: alumniId could be string or object
      const alumniRequests = allRequests.filter((req) => {
        if (!req.alumniId) return false;

        // case 1: alumniId is stored as string
        if (typeof req.alumniId === "string") {
          return String(req.alumniId) === String(userID);
        }

        // case 2: alumniId is populated object (with _id)
        if (typeof req.alumniId === "object" && req.alumniId._id) {
          return String(req.alumniId._id) === String(userID);
        }

        return false;
      });

      setRequests(alumniRequests);
    } catch (err) {
      console.error("❌ Error fetching requests:", err.message);
      toast.error("Failed to load your requests.");
    }
  };

  return (
    <div style={{ width: "100%" }} className="min-h-screen bg-gray-50 p-6">
      <div
        style={{ width: "100%" }}
        className="p-6 rounded-xl shadow-lg max-w-5xl mx-auto bg-white"
      >
        {requests.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Company/Program</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr key={i}>
                  <td className="border p-2">{req.title}</td>
                  <td className="border p-2">{req.type}</td>
                  <td className="border p-2">{req.companyName}</td>
                  <td className="border p-2">{req.department}</td>
                  <td
                    className={`border p-2 font-medium ${
                      req.status === "approved"
                        ? "text-green-600"
                        : req.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {req.status || "pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">
            No placement requests found for your account.
          </p>
        )}
      </div>
    </div>
  );
}

export default AlumniRequests;
