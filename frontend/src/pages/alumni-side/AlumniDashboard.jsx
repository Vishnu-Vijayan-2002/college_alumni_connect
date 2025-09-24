import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlumniRequests from "./AlumniRequests";
import AlumniProfile from "./AlumniProfile"; // 👈 profile component

function AlumniDashboard() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId=localStorage.getItem("userId");
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

  const stats = [
    { title: "Experience (Years)", value: user.experience || 0 },
    { title: "Company", value: user.company || "Not Added" },
    { title: "Position", value: user.position || "Not Added" },
    {
      title: "Verification Status",
      value: user.verificationStatus || "Pending",
    },
    {
      title: "Placement Request",
      value: clicked ? "Processing..." : "Click to Request",
      isRequest: true,
    },
    { title: "My Requests", value: "View", isMyRequests: true },
    { title: "My Profile", value: "View", isProfile: true }, // ✅ profile link
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!userId && !user._id) return toast.error("User ID not found. Please login again.");

  setLoading(true);
  setClicked(true);

  try {
    const payload = {
      ...requestData,
      alumniId: user._id || userId,
      salary: Number(requestData.salary) || 0,
    };

    await axios.post(
      "http://localhost:5000/api/placement-cell/new-request",
      payload,
      { headers: { "Content-Type": "application/json" } }
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
  } catch (err) {
    console.error("Submit error:", err);
    toast.error("Failed to submit request.");
  } finally {
    setLoading(false);
    setClicked(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Welcome, {user.name || "Alumni"}
        </h1>
        <p className="text-gray-600">Here’s your alumni dashboard overview.</p>
      </header>

      {/* Requests Page */}
      {showRequests ? (
        <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              📋 My Placement Requests
            </h2>
            <button
              onClick={() => setShowRequests(false)}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              ⬅ Back
            </button>
          </div>
          <AlumniRequests />
        </div>
      ) : showProfile ? (
        // Profile Page
        <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">👤 My Profile</h2>
            <button
              onClick={() => setShowProfile(false)}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              ⬅ Back
            </button>
          </div>
          <AlumniProfile />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                onClick={() => {
                  if (stat.isRequest && !clicked) setShowForm(true);
                  if (stat.isMyRequests) setShowRequests(true);
                  if (stat.isProfile) setShowProfile(true);
                }}
                className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all cursor-pointer animate-fade-in"
              >
                <h3 className="text-sm font-medium opacity-90">{stat.title}</h3>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Placement Request Form */}
          {showForm && (
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6 max-w-3xl mx-auto animate-slide-down">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {requestData.type.charAt(0).toUpperCase() +
                  requestData.type.slice(1)}{" "}
                Request Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Request Type */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Request Type
                  </label>
                  <select
                    name="type"
                    value={requestData.type}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                    <option value="program">Training Program</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={requestData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
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
                    placeholder="Enter name"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={requestData.description}
                    onChange={handleChange}
                    placeholder="Details about the request..."
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Department + Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={requestData.department}
                      onChange={handleChange}
                      placeholder="Computer Science"
                      className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={requestData.duration}
                      onChange={handleChange}
                      placeholder="6 months"
                      className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Salary + Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      value={requestData.salary}
                      onChange={handleChange}
                      placeholder="45000"
                      className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={requestData.position}
                      onChange={handleChange}
                      placeholder="Backend Developer"
                      className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Placement Process */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Placement Process
                  </label>
                  <input
                    type="text"
                    name="placementProcess"
                    value={requestData.placementProcess}
                    onChange={handleChange}
                    placeholder="Written test + Interview"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit Request"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          .animate-slide-down {
            animation: slideDown 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default AlumniDashboard;
