import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlumniRequests from "./AlumniRequests";
import AlumniProfile from "./AlumniProfile"; // profile component

function AlumniDashboard() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = localStorage.getItem("userId") || user._id;
  const token = localStorage.getItem("token");
// console.log(token);

  const [requestData, setRequestData] = useState({
    type1: "demo",
    type: "job",
    title: "",
    companyName: "",
    description: "",
    department: "",
    duration: "",
    salary: "",
    position: "",
    placementProcess: "",
  });

  const [alumniRequests, setAlumniRequests] = useState([]);

  // Fetch alumni requests on mount
  useEffect(() => {
    fetchAlumniRequests();
  }, []);

  const fetchAlumniRequests = async () => {
    if (!userId || !token) return;

    try {
      // Make sure you use the correct endpoint that returns an array of requests
      const res = await axios.get(
        `http://localhost:5000/api/placement-cell/alumni-requests/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ensure res.data is an array
      setAlumniRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      // toast.error("Could not fetch your requests.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !token) return toast.error("User ID not found. Please login again.");
    setLoading(true);

    try {
      const payload = {
        ...requestData,
        alumniId: userId,
        salary: Number(requestData.salary) || 0,
      };

      await axios.post(
        "http://localhost:5000/api/alumni/new-request",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Placement request submitted successfully!");
      setShowForm(false);
      setRequestData({
        type1: "demo",
        type: "job",
        title: "",
        companyName: "",
        description: "",
        department: "",
        duration: "",
        salary: "",
        position: "",
        placementProcess: "",
      });

      fetchAlumniRequests(); // update request status after submission
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  // Safe optional chaining to prevent crash
  const placementRequestStatus =
    alumniRequests.length === 0
      ? "Click to Request"
      : alumniRequests[alumniRequests.length - 1]?.status || "Processing...";

  const stats = [
    { title: "Experience (Years)", value: user.experience || 0, icon: "📊" },
    { title: "Company", value: user.company || "Not Added", icon: "🏢" },
    { title: "Position", value: user.position || "Not Added", icon: "💼" },
    {
      title: "Verification Status",
      value: user.verificationStatus || "Pending",
      icon: "✅"
    },
    {
      title: "Placement Request",
      value: placementRequestStatus,
      isRequest: true,
      icon: "📝"
    },
    { title: "My Requests", value: "View", isMyRequests: true, icon: "📋" },
    { title: "My Profile", value: "View", isProfile: true, icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, {user.name || "Alumni"}
        </h1>
        <p className="text-gray-600 text-lg">Here's your alumni dashboard overview</p>
      </header>

      {/* Requests or Profile View */}
      {showRequests ? (
        <div className="bg-white p-8 rounded-2xl shadow-md animate-fade-in max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              📋 My Placement Requests
            </h2>
            <button
              onClick={() => setShowRequests(false)}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              ← Back
            </button>
          </div>
          <AlumniRequests />
        </div>
      ) : showProfile ? (
        <div className="bg-white p-8 rounded-2xl shadow-md animate-fade-in max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              👤 My Profile
            </h2>
            <button
              onClick={() => setShowProfile(false)}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              ← Back
            </button>
          </div>
          <AlumniProfile />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 max-w-7xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                onClick={() => {
                  if (stat.isRequest) setShowForm(true);
                  if (stat.isMyRequests) setShowRequests(true);
                  if (stat.isProfile) setShowProfile(true);
                }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">{stat.title}</h3>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Placement Request Form */}
          {showForm && (
            <div className="bg-white p-8 rounded-2xl shadow-md mb-6 max-w-4xl mx-auto animate-slide-down">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  📝 New Placement Request
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  ✕ Close
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Request Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Request Type
                  </label>
                  <select
                    name="type"
                    value={requestData.type}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                    <option value="program">Training Program</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={requestData.title}
                      onChange={handleChange}
                      placeholder="e.g., Software Engineer"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {requestData.type === "job"
                        ? "Company Name"
                        : requestData.type === "internship"
                        ? "Organization"
                        : "Program Name"}
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={requestData.companyName}
                      onChange={handleChange}
                      placeholder="e.g., Google"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={requestData.description}
                    onChange={handleChange}
                    placeholder="Describe the role and requirements..."
                    rows={4}
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={requestData.department}
                      onChange={handleChange}
                      placeholder="e.g., Computer Science"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={requestData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 6 months"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Salary */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      value={requestData.salary}
                      onChange={handleChange}
                      placeholder="50000"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={requestData.position}
                      onChange={handleChange}
                      placeholder="e.g., Senior Developer"
                      className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Placement Process */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Placement Process
                  </label>
                  <input
                    type="text"
                    name="placementProcess"
                    value={requestData.placementProcess}
                    onChange={handleChange}
                    placeholder="e.g., Written test + Interview"
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* Simple Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out;
          }
          .animate-slide-down {
            animation: slideDown 0.4s ease-out;
          }
          
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(-15px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes slideDown {
            from { 
              opacity: 0; 
              transform: translateY(-20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
        `}
      </style>
    </div>
  );
}

export default AlumniDashboard;