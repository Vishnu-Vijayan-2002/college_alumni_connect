import React, { useEffect, useState } from "react";
import axios from "axios";
import { XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/placement-cell/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("❌ Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (responseId, newStatus) => {
    const confirmChange = window.confirm(`Are you sure you want to change status to "${newStatus}"?`);
    if (!confirmChange) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/placement-cell/update-status",
        { responseId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state immediately
      setSelectedRequest((prev) => ({
        ...prev,
        applicants: prev.applicants.map((app) =>
          app._id === responseId ? { ...app, status: newStatus } : app
        ),
      }));

      toast.success(`Status updated to "${newStatus}" successfully!`);
        window.location.reload();
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error("Failed to update status. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* <h2 className="text-3xl font-bold mb-6 text-gray-800">Placement Applications</h2> */}

      {loading && <div className="text-gray-500 animate-pulse">Loading applications...</div>}
      {!loading && applications.length === 0 && <p className="text-gray-500">No applications found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!loading &&
          applications.map((req) => (
            <div
              key={req.requestId}
              className="p-5 border rounded-xl shadow hover:shadow-lg cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedRequest(req)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{req.formTitle}</h3>
              {req.companyName && <p className="text-gray-600">Company: {req.companyName}</p>}
              {req.jobRole && <p className="text-gray-600">Job Role: {req.jobRole}</p>}
              {req.deadline && (
                <p className="text-gray-500 text-sm mt-1">
                  Deadline: {new Date(req.deadline).toLocaleDateString()}
                </p>
              )}
              <p className="mt-2 text-gray-700 font-medium">Total Applicants: {req.totalApplicants}</p>
            </div>
          ))}
      </div>

      {/* Modal / Detailed View */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedRequest.formTitle}</h2>

            {selectedRequest.applicants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse text-gray-700">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Applied Date</th>
                      <th className="border px-4 py-2">Status</th>
                      <th className="border px-4 py-2">Answers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRequest.applicants.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 font-medium">{app.student.name}</td>
                        <td className="border px-4 py-2">{app.student.email}</td>
                        <td className="border px-4 py-2">{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">
                          <select
                            value={app.status || "pending"}
                            onChange={(e) => updateStatus(app._id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-sm font-semibold cursor-pointer ${
                              statusColors[app.status?.toLowerCase()] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="border px-4 py-2">
                          {Object.entries(app.answers).map(([field, value], i) => (
                            <div key={i} className="mb-1">
                              <span className="font-semibold">{field.trim() || "Field"}:</span>{" "}
                              <span>{value}</span>
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No applicants yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
