import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ApplicantsPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/placement-cell/dashboard/${requestId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      }
    };

    fetchApplicants();
  }, [requestId]);

  if (!data) return <p className="p-6">Loading...</p>;

  const { formTitle, totalApplicants, byDepartment } = data;

  // ✅ Excel download function
  const exportToExcel = () => {
    let excelData = [];

    Object.keys(byDepartment).forEach((dept) => {
      byDepartment[dept].forEach((app) => {
        excelData.push({
          Name: app.student.name,
          Email: app.student.email,
          "Roll No": app.student.rollNo,
          Department: dept,
          Status: app.status,
          "Applied At": new Date(app.appliedAt).toLocaleDateString(),
          ...app.answers, // dynamic fields
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${formTitle}_Applicants.xlsx`);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Left: Back button */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 shadow-sm"
        >
          ← Back
        </button>

        {/* Right: Download button */}
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          ⬇ Download Excel
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Applicants for {formTitle}
        </h1>
        <p className="text-gray-600 text-lg">
          Total Applicants:{" "}
          <span className="font-semibold text-gray-800">
            {totalApplicants}
          </span>
        </p>
      </div>

      {/* Department-wise Tables */}
      {Object.keys(byDepartment).length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        Object.keys(byDepartment).map((dept) => {
          const applicants = byDepartment[dept];
          const dynamicFields = new Set();
          applicants.forEach((app) => {
            Object.keys(app.answers || {}).forEach((key) =>
              dynamicFields.add(key)
            );
          });

          return (
            <div
              key={dept}
              className="mb-12 bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {dept} Department
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-indigo-100 text-indigo-800">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Roll No</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Applied At</th>
                      {/* Dynamic fields */}
                      {[...dynamicFields].map((field) => (
                        <th key={field} className="px-4 py-3 text-left">
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((app, idx) => (
                      <tr
                        key={idx}
                        className="border-b last:border-none hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-2">{app.student.name}</td>
                        <td className="px-4 py-2">{app.student.email}</td>
                        <td className="px-4 py-2">{app.student.rollNo}</td>
                        <td className="px-4 py-2 capitalize">{app.status}</td>
                        <td className="px-4 py-2">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>
                        {[...dynamicFields].map((field) => (
                          <td key={field} className="px-4 py-2">
                            {app.answers[field] || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ApplicantsPage;
