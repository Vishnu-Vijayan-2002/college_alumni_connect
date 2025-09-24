import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PlacementRequestsPage() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/placement-cell/get-request",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching placement requests:", err);
    }
  };

  // Handle approve/reject
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/placement-cell/requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests(); // refresh list
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Alumni Placement Requests
        </h1>
        <button
          onClick={() => navigate("/placement-dashboard")}
          className="px-4 py-2 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </button>
      </header>

      {/* Requests List */}
      {requests.filter((req) => req.status !== "rejected").length === 0 ? (
        <p className="text-gray-600">No pending or approved placement requests yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {requests
            .filter((req) => req.status === "pending" || req.status === "approved")
            .map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition"
              >
                {/* Title & Position */}
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {req.title} -{" "}
                  <span className="text-indigo-600">{req.position}</span>
                </h2>
                <p className="text-gray-600 mb-4">{req.description}</p>

                {/* Info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-700 mb-4">
                  <p>
                    <span className="font-semibold">Alumni:</span>{" "}
                    {req.alumniId?.name || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold">Company:</span>{" "}
                    {req.companyName || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Department:</span>{" "}
                    {req.department}
                  </p>
                  <p>
                    <span className="font-semibold">Duration:</span>{" "}
                    {req.duration || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Salary:</span> ₹{req.salary}
                  </p>
                  <p>
                    <span className="font-semibold">Process:</span>{" "}
                    {req.placementProcess}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  {req.status === "pending" && (
                    <>
                      <Clock className="text-yellow-500 w-5 h-5" />
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    </>
                  )}
                  {req.status === "approved" && (
                    <>
                      <CheckCircle className="text-green-500 w-5 h-5" />
                      <span className="text-green-600 font-medium">
                        Approved
                      </span>
                    </>
                  )}
                </div>

                {/* Actions (only for pending) */}
                {req.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus(req._id, "approved")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, "rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PlacementRequestsPage;
