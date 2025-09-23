import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Building2, Briefcase, Coins, FileText, Users, X } from "lucide-react";

function PlacementFormDetailPage() {
  const { placementId } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  const [extraFields, setExtraFields] = useState([""]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/placement-cell/placement-form/${placementId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormDetails(res.data);
      } catch (err) {
        console.error("Error fetching form details:", err);
      }
    };

    fetchFormDetails();
  }, [placementId]);

  const handleFieldChange = (index, value) => {
    const updated = [...extraFields];
    updated[index] = value;
    setExtraFields(updated);
  };

  const addField = () => setExtraFields([...extraFields, ""]);
  const removeField = (index) => {
    const updated = extraFields.filter((_, i) => i !== index);
    setExtraFields(updated);
  };

  const handleSendToStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/placement-cell/send-to-students/${placementId}`,
        { requiredFields: extraFields },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request sent to students successfully!");
      setShowModal(false);
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request to students.");
    }
  };

  if (!formDetails) return <p className="p-6 text-lg">Loading...</p>;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
      >
        ← Back
      </button>

      {/* Placement Card */}
     {/* Placement Card */}
<div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-100 max-w-2xl mx-auto">
  <h1 className="text-2xl font-extrabold mb-6 text-indigo-700 flex items-center gap-3">
    <Briefcase className="w-7 h-7 text-indigo-600" />
    {formDetails.title}
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm leading-relaxed">
    <p className="flex items-center gap-2">
      <Building2 className="w-5 h-5 text-indigo-500" />
      <b>Company:</b> {formDetails.companyName}
    </p>
    <p className="flex items-center gap-2">
      <Users className="w-5 h-5 text-indigo-500" />
      <b>Department:</b> {formDetails.department}
    </p>
    <p className="flex items-center gap-2">
      <Briefcase className="w-5 h-5 text-indigo-500" />
      <b>Position:</b> {formDetails.position || "-"}
    </p>
    <p className="flex items-center gap-2">
      <FileText className="w-5 h-5 text-indigo-500" />
      <b>Duration:</b> {formDetails.duration || "-"}
    </p>
    <p className="flex items-center gap-2">
      <Coins className="w-5 h-5 text-indigo-500" />
      <b>Salary:</b>{" "}
      {formDetails.salary ? `₹${formDetails.salary}` : "N/A"}
    </p>
  </div>

  <hr className="my-5 border-gray-200" />

  <p className="text-gray-700 mb-3 text-sm">
    <b>Placement Process:</b> {formDetails.placementProcess}
  </p>
  <p className="text-gray-600 italic text-sm">{formDetails.description}</p>

  {/* Send Button */}
  <div className="mt-6 flex justify-end">
    <button
      onClick={() => setShowModal(true)}
      className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 shadow"
    >
       Send to Students
    </button>
  </div>
</div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 p-8 rounded-2xl w-96 shadow-2xl relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
              Add Extra Fields
            </h2>

            {extraFields.map((field, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="text"
                  value={field}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  placeholder="Enter field (e.g., Resume)"
                  className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                <button
                  onClick={() => removeField(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </div>
            ))}

            <button
              onClick={addField}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 mb-4 transition w-full"
            >
              ➕ Add Field
            </button>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendToStudents}
                className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow"
              >
                ✅ Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementFormDetailPage;
