import React, { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    passoutYear: "",
    region: "",
    rollNo: "",
    admissionNo: "",
    interestedIn: [],
    company: "",
    position: "",
    experience: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      interestedIn: checked
        ? [...prev.interestedIn, value]
        : prev.interestedIn.filter((i) => i !== value),
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.includes("@")) return "Invalid email";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    if (!formData.department) return "Department is required";
    if (!formData.passoutYear) return "Passout year is required";

    if (formData.role === "student") {
      if (!formData.rollNo) return "Roll number is required for students";
      if (!formData.admissionNo)
        return "Admission number is required for students";
    }

    if (formData.role === "alumni" && !formData.region) {
      return "Region is required for alumni";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("🎉 Registered successfully!");
      } else {
        toast.error("⚠️ " + (data.error || "Registration failed"));
      }
    } catch (err) {
      toast.error("❌ Server error: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 grid gap-6 md:grid-cols-2"
      >
        <h2 className="col-span-2 text-3xl font-bold text-gray-800 text-center mb-4">
          Registration Form
        </h2>

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="col-span-2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400"
        >
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
        />

        {/* Passout Year */}
        <input
          type="number"
          name="passoutYear"
          placeholder="Passout Year"
          value={formData.passoutYear}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
        />

        {/* Student Fields */}
        {formData.role === "student" && (
          <>
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
            />
            <input
              type="text"
              name="admissionNo"
              placeholder="Admission Number"
              value={formData.admissionNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
            />
          </>
        )}

        {/* Alumni Field */}
        {formData.role === "alumni" && (
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={formData.region}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full"
          />
        )}

        {/* Interested In */}
        {/* Interested In */}
<div className="col-span-2">
  <p className="font-semibold text-gray-700 mb-2">Interested In</p>
  <div className="flex gap-4 flex-wrap">
    {["Job", "Internship", "Programmes"].map((item) => (
      <label key={item} className="flex items-center gap-2">
        <input
          type="checkbox"
          value={item}
          onChange={handleCheckbox}
          checked={formData.interestedIn.includes(item)}
          className="accent-blue-500 w-5 h-5"
        />
        {item}
      </label>
    ))}
  </div>
</div>


        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          Register
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Slide}
      />
    </div>
  );
}
