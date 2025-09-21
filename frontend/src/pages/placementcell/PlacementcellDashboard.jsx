import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardList, Users, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PlacementcellDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [dashboardData, setDashboardData] = useState([]);
  const [alumniRequests, setAlumniRequests] = useState([]);


  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("user")) || {};
  setUser(stored);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Placement requests (with applicants)
      const dashboardRes = await axios.get(
        "http://localhost:5000/api/placement-cell/dashboard",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDashboardData(dashboardRes.data);

      // Alumni requests (with pending/approved status)
      const alumniReqRes = await axios.get(
        "http://localhost:5000/api/placement-cell/get-request",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlumniRequests(alumniReqRes.data); // <-- new state
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  fetchData();
}, []);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-indigo-700">
          Welcome, {user.name}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div onClick={() => navigate("/placement-requests")} className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <ClipboardList className="text-indigo-500 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold">Placement Requests</h3>
            <p className="text-gray-600"> {alumniRequests.filter((r) => r.status === "pending").length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Users className="text-green-500 w-10 h-10" />
          <h3 className="text-lg font-semibold">Total Placements</h3>
          <p className="text-gray-600">
          {alumniRequests.filter((req) => req.status === "approved").length}
          </p>
        </div>
        <div  onClick={() => navigate("/placement-forms")} className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Clock className="text-orange-500 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold">Placement Forms</h3>
            <p className="text-gray-600">
              {dashboardData.filter(
                (req) => new Date(req.deadline) > new Date()
              ).length}
            </p>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Placements
        </h2>
        {dashboardData.length === 0 ? (
          <p className="text-gray-600">No placement requests created yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Title</th>
                <th className="p-3">Company</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Applicants</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.map((req) => (
                <tr key={req.requestId} className="border-b hover:bg-gray-50">
                  <td className="p-3">{req.formTitle}</td>
                  <td className="p-3">{req.companyName}</td>
                  <td className="p-3">{new Date(req.deadline).toLocaleDateString()}</td>
                  <td className="p-3">{req.totalApplicants}</td>
                  <td className="p-3">
                  <button className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                  onClick={() => navigate(`/placement-dashboard/applicants/${req.requestId}`)}>
                      View Applicants
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PlacementcellDashboard;
