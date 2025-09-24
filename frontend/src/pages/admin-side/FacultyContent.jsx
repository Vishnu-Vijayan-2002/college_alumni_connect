import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FacultyContent = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    inCharge: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // ✅ Fetch faculty list
  const fetchFacultyList = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/faculty/get-all-faculty", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setFacultyList(data.faculties || []);
      else toast.error(data.message || "Failed to load faculty list");
    } catch (error) {
      toast.error("Failed to fetch faculty");
    }
  };

  useEffect(() => {
    fetchFacultyList();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add new faculty
  const handleAddFaculty = async () => {
    if (!newFaculty.name || !newFaculty.email || !newFaculty.password || !newFaculty.department) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/faculty/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...newFaculty, role: "faculty" }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Faculty added successfully!");
        setNewFaculty({ name: "", email: "", password: "", department: "", inCharge: "" });
        fetchFacultyList();
      } else toast.error(data.message || "Failed to add faculty");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // ✅ Delete faculty
  const handleDeleteFaculty = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/faculty/delete-faculty/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Faculty deleted successfully!");
        setFacultyList(facultyList.filter((f) => f._id !== id));
      } else toast.error(data.message || "Failed to delete faculty");
    } catch (error) {
      toast.error("Something went wrong while deleting!");
    }
  };

  // ✅ Start editing
  const handleEditClick = (faculty) => {
    setEditingId(faculty._id);
    setEditData({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
      inCharge: faculty.inCharge,
    });
  };

  // ✅ Handle editing input
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updates
  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/faculty/update-faculty/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Faculty updated successfully!");
        setFacultyList(facultyList.map((f) => (f._id === id ? { ...f, ...editData } : f)));
        setEditingId(null);
      } else toast.error(data.message || "Failed to update faculty");
    } catch (error) {
      toast.error("Something went wrong while updating!");
    }
  };

  // ✅ Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Faculty Management</h3>

      {/* Add Faculty Form */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
        <h4 className="text-md font-semibold mb-3">Add New Faculty</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input type="text" name="name" value={newFaculty.name} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded" />
          <input type="email" name="email" value={newFaculty.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" autoComplete="new-password" />
          <input type="password" name="password" value={newFaculty.password} onChange={handleChange} placeholder="Password" className="p-2 border rounded" autoComplete="new-password"  />
          <select name="department" value={newFaculty.department} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select Department</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
            <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Production Engineering">Production Engineering</option>
            <option value="Architecture">Architecture</option>
            <option value="MCA">MCA</option>
          </select>
          <select name="inCharge" value={newFaculty.inCharge} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select In-Charge Department</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
            <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Production Engineering">Production Engineering</option>
            <option value="Architecture">Architecture</option>
            <option value="MCA">MCA</option>
          </select>
        </div>
        <button onClick={handleAddFaculty} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Faculty
        </button>
      </div>

      {/* Faculty Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">In-Charge</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.length ? (
              facultyList.map((faculty) => (
                <tr key={faculty._id} className="border-t">
                  <td className="px-4 py-2">
                    {editingId === faculty._id ? (
                      <input name="name" value={editData.name} onChange={handleEditChange} className="p-1 border rounded w-full" />
                    ) : faculty.name}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === faculty._id ? (
                      <input name="email" value={editData.email} onChange={handleEditChange} className="p-1 border rounded w-full" />
                    ) : faculty.email}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === faculty._id ? (
                      <input name="department" value={editData.department} onChange={handleEditChange} className="p-1 border rounded w-full" />
                    ) : faculty.department}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === faculty._id ? (
                      <input name="inCharge" value={editData.inCharge} onChange={handleEditChange} className="p-1 border rounded w-full" />
                    ) : faculty.inCharge}
                  </td>
                  <td className="px-4 py-2">{faculty.role}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    {editingId === faculty._id ? (
                      <>
                        <button onClick={() => handleSaveEdit(faculty._id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                          Save
                        </button>
                        <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(faculty)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteFaculty(faculty._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No faculty added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FacultyContent;
