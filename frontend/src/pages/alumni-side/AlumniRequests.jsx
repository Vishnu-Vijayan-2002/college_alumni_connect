import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AlumniRequests() {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userID=localStorage.getItem("userId")
  useEffect(() => {
    fetchRequests();
  }, [userID]);

  const fetchRequests = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/placement-cell/get-request");
    const allRequests = res.data || [];

    // ✅ only include requests belonging to this alumni
    const alumniRequests = allRequests.filter(
      (req) => req.alumniId && req.alumniId._id === userID
    );

    setRequests(alumniRequests);
  } catch (err) {
    console.error("Error fetching requests:", err.message);
    toast.error("Failed to load your requests.");
  }
};


  return (
    <div style={{width:"100%"}} className="min-h-screen bg-white-100 p-6">
      <header className="mb-6 flex justify-between items-center">
      </header>

      <div style={{width:"100%"}}  className= "p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
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
          <p className="text-gray-600">No placement requests found.</p>
        )}
      </div>
    </div>
  );
}

export default AlumniRequests;
