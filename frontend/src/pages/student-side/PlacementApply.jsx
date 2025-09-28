import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Send } from "lucide-react";

const PlacementApply = () => {
  const { id } = useParams(); // PlacementRequest._id
  const navigate = useNavigate();

  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Fetch placement request details
  useEffect(() => {
    const fetchPlacement = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/placement-cell/placement-request/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Fetched placement:", res.data);

        setPlacement(res.data);

        // initialize formData with empty strings for each required field
        const init = {};
        res.data.requiredFields.forEach((f) => (init[f] = ""));
        setFormData(init);
      } catch (err) {
        console.error("❌ Error fetching placement:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacement();
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // 🔹 Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      console.log("Submitting application:", {
        requestId: placement._id,
        answers: formData,
      });

      await axios.post(
        "http://localhost:5000/api/placement-cell/apply",
        {
          requestId: placement._id, // ✅ PlacementRequest._id
          answers: formData,        // ✅ must match requiredFields
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Application submitted successfully!");
      navigate("/student-dashboard/placements");
    } catch (err) {
      console.error("❌ Error submitting application:", err.response?.data || err);
      alert(err.response?.data?.error || "Error submitting application.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading placement...</p>;
  if (!placement) return <p className="p-6 text-center">Placement not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Apply for {placement.formTitle}
      </h1>
      <p className="text-gray-600 mb-6">{placement.description}</p>

      {/* Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border">
        <p>
          <span className="font-semibold">Company:</span>{" "}
          {placement.companyName}
        </p>
        <p>
          <span className="font-semibold">Role:</span>{" "}
          {placement.jobRole || placement.alumniRequest?.position || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Deadline:</span>{" "}
          {new Date(placement.deadline).toLocaleDateString()}
        </p>
      </div>

      {/* Dynamic Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {placement.requiredFields.map((field, idx) => (
          <div key={idx}>
            <label className="block font-medium text-gray-700 mb-1">
              {field}
            </label>
            <input
              type="text"
              value={formData[field] || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter your ${field}`}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl shadow hover:from-green-700 hover:to-blue-700 transition"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" /> Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PlacementApply;
