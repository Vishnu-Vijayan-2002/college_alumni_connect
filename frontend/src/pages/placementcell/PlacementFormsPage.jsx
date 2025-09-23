import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlacementFormsPage() {
  const [approvedPlacements, setApprovedPlacements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedPlacements = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/placement-cell/get-request",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // filter only approved + not forwarded
        const filtered = res.data.filter(
          (req) => req.status === "approved" && req.forwarded === false
        );

        setApprovedPlacements(filtered);
        console.log("Filtered placements:", filtered);
      } catch (err) {
        console.error("Error fetching approved placements:", err);
      }
    };

    fetchApprovedPlacements();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Approved Placement Forms</h1>

      {approvedPlacements.length === 0 ? (
        <p>No approved & unforwarded placements yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Salary / Duration</th>
              <th className="border px-4 py-2">Placement Process</th>
              <th className="border px-4 py-2">Form Details</th>
            </tr>
          </thead>
          <tbody>
            {approvedPlacements.map((placement) => (
              <tr key={placement._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{placement.title}</td>
                <td className="border px-4 py-2">{placement.companyName}</td>
                <td className="border px-4 py-2">{placement.department}</td>
                <td className="border px-4 py-2">
                  {placement.salary || placement.duration}
                </td>
                <td className="border px-4 py-2">{placement.placementProcess}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/placement-form/${placement._id}`)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    View Form
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PlacementFormsPage;
