import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PlacementFormDetailPage() {
  const { placementId } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  const [extraFields, setExtraFields] = useState([""]); // dynamic extra fields
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch company/alumni placement request
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

  // Handle extra fields input
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

  // Send to students API
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

  if (!formDetails) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{formDetails.title}</h1>
      <p className="mb-2"><b>Company:</b> {formDetails.description}</p>
      <p className="mb-2"><b>Department:</b> {formDetails.department}</p>
      <p className="mb-2"><b>Position:</b> {formDetails.position}</p>
      <p className="mb-2"><b>Salary:</b> {formDetails.salary}</p>
      <p className="mb-4"><b>Process:</b> {formDetails.placementProcess}</p>

      {/* ✅ Button to send request */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Send to Students
      </button>

      {/* ✅ Modal for adding extra fields */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Extra Fields</h2>

            {extraFields.map((field, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={field}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  placeholder="Enter required field (e.g., Resume)"
                  className="border px-2 py-1 rounded w-full"
                />
                <button
                  onClick={() => removeField(index)}
                  className="ml-2 text-red-500"
                >
                  ✖
                </button>
              </div>
            ))}

            <button
              onClick={addField}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 mb-4"
            >
              ➕ Add Field
            </button>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSendToStudents}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementFormDetailPage;
