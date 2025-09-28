import React, { useEffect, useState } from "react";

const AlumniContent = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlum, setSelectedAlum] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAlumniList();
  }, []);

  // Fetch alumni list
  const fetchAlumniList = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // if your API requires token
      const res = await fetch("http://localhost:5000/api/alumni/get-all-alumni", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      console.log("API response:", data);

      // Adjust based on response structure
      if (Array.isArray(data)) setAlumni(data);
      else if (Array.isArray(data.data)) setAlumni(data.data);
      else if (Array.isArray(data.alumni)) setAlumni(data.alumni);
      else setAlumni([]);
    } catch (error) {
      console.error("Error fetching alumni:", error);
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  // Format value for display
  const formatValue = (value) => {
    if (value === null || value === undefined) return "-";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    if (typeof value === "string" && /\d{4}-\d{2}-\d{2}T/.test(value)) {
      return new Date(value).toLocaleString();
    }
    return value.toString();
  };

  // Update verification status
  const updateStatus = async (email, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this alumni as '${newStatus}'?`)) return;
    setUpdating(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/alumni/${email}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        // Update selectedAlum locally
        setSelectedAlum((prev) => ({
          ...prev,
          verificationStatus: newStatus,
          verifiedBy: data.data?.alumni?.verifiedBy || prev.verifiedBy,
          verifiedAt: data.data?.alumni?.verifiedAt || prev.verifiedAt,
        }));
        fetchAlumniList();
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Alumni List</h2>

      {loading ? (
        <p>Loading alumni...</p>
      ) : alumni.length === 0 ? (
        <p>No alumni found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Verification</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alumni.map((alum) => (
                <tr key={alum._id || alum.email} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{alum.name}</td>
                  <td className="px-4 py-2">{alum.email}</td>
                  <td className="px-4 py-2">{alum.department || "-"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ["approved", "verified"].includes(alum.verificationStatus)
                          ? "bg-green-100 text-green-800"
                          : alum.verificationStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {alum.verificationStatus || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setSelectedAlum(alum)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedAlum && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={() => setSelectedAlum(null)}
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
              <div className="mb-4 md:mb-0 md:mr-6">
                {selectedAlum.profileImage ? (
                  <img
                    src={selectedAlum.profileImage}
                    alt={selectedAlum.name}
                    className="h-24 w-24 rounded-full object-cover border"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-3xl font-bold border">
                    {selectedAlum.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold">{selectedAlum.name}</h3>
                <p className="text-gray-600">{selectedAlum.email}</p>
                <p className="text-gray-600">{selectedAlum.department || "-"} Department</p>
                {selectedAlum.passoutYear && <p className="text-gray-600">Passout Year: {selectedAlum.passoutYear}</p>}

                <span
                  className={`inline-block px-3 py-1 mt-2 rounded-full text-sm font-medium ${
                    ["approved", "verified"].includes(selectedAlum.verificationStatus)
                      ? "bg-green-100 text-green-800"
                      : selectedAlum.verificationStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedAlum.verificationStatus || "pending"}
                </span>

                {/* Full Verified By Details */}
                {["approved", "verified"].includes(selectedAlum.verificationStatus) && selectedAlum.verifiedBy && (
                  <div className="mt-2 text-gray-700">
                    <p>
                      <span className="font-semibold">Verified By:</span> {selectedAlum.verifiedBy.name || "-"} ({selectedAlum.verifiedBy.role || "-"})
                    </p>
                    <p>
                      <span className="font-semibold">Verified At:</span> {selectedAlum.verifiedAt ? new Date(selectedAlum.verifiedAt).toLocaleString() : "-"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Update */}
            <div className="my-4">
              <label className="block mb-2 font-semibold">Update Verification Status:</label>
              <select
                value={selectedAlum.verificationStatus || "pending"}
                onChange={(e) => updateStatus(selectedAlum.email, e.target.value)}
                disabled={updating}
                className="border px-3 py-2 rounded w-full md:w-1/2"
              >
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Other details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedAlum).map(([key, value]) => {
                if (
                  ["name", "email", "department", "passoutYear", "profileImage", "verificationStatus", "verifiedBy", "verifiedAt", "password"].includes(key)
                )
                  return null; // exclude main/sensitive fields
                return (
                  <div key={key} className="bg-gray-50 p-3 rounded border">
                    <span className="font-semibold capitalize">{key}:</span>{" "}
                    <span className="text-gray-700">{formatValue(value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniContent;
