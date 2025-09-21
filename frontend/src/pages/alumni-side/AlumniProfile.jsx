import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlumniProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [formData, setFormData] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile by ID
  useEffect(() => {
    const fetchProfile = async () => {
      if (storedUser?._id && storedUser?.token) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/alumni/profile/${storedUser._id}`,
            {
              headers: {
                Authorization: `Bearer ${storedUser.token}`, // send token
              },
            }
          );
          setFormData(res.data.data);
          // keep token in localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({ ...res.data.data, token: storedUser.token })
          );
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch profile ❌");
        }
      }
    };

    fetchProfile();
  }, [storedUser]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes
  const handleSave = async () => {
    try {
      const token = storedUser.token;
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await axios.put(
        `http://localhost:5000/api/alumni/profile/${storedUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Profile updated successfully ✅");

      // Update state and localStorage
      setFormData(res.data.data);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...res.data.data, token })
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={formData.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{formData.name}</h2>
        <p className="text-gray-500">{formData.role}</p>

        {!isEditing ? (
          <div className="mt-4 space-y-2 text-left">
            <p>
              <span className="font-medium">📧 Email:</span> {formData.email}
            </p>
            <p>
              <span className="font-medium">🏫 Department:</span> {formData.department}
            </p>
            <p>
              <span className="font-medium">🎓 Passout Year:</span> {formData.passoutYear}
            </p>
            <p>
              <span className="font-medium">🏢 Company:</span> {formData.company || "Not added"}
            </p>
            <p>
              <span className="font-medium">💼 Position:</span> {formData.position || "Not added"}
            </p>
            <p>
              <span className="font-medium">⏳ Experience:</span> {formData.experience || 0} years
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3 text-left">
            <input
              type="text"
              name="department"
              value={formData.department || ""}
              onChange={handleChange}
              placeholder="Department"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="passoutYear"
              value={formData.passoutYear || ""}
              onChange={handleChange}
              placeholder="Passout Year"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="company"
              value={formData.company || ""}
              onChange={handleChange}
              placeholder="Company"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="position"
              value={formData.position || ""}
              onChange={handleChange}
              placeholder="Position"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="experience"
              value={formData.experience || 0}
              onChange={handleChange}
              placeholder="Experience (Years)"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage || ""}
              onChange={handleChange}
              placeholder="Profile Image URL"
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        <div className="mt-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-3">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlumniProfile;
