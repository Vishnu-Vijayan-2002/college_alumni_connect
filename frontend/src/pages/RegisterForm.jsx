import React, { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundImage from "../assets/images/login.jpg";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterForm() {

  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    branch: "",
    passoutYear: "",
    rollNo: "",
    classRollNo: "",
    admissionNo: "",
    region: "",
    interestedIn: [],
  });

  const interestOptions = ["Finance", "Management", "Marketing", "IT"];

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
      if (!formData.classRollNo)
        return "Class roll number is required for students";
      if (!formData.admissionNo)
        return "Admission number is required for students";
      if (!formData.branch) return "Branch is required for students";
    }

    if (formData.role === "alumni") {
      if (!formData.region) return "Region is required for alumni";
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
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        if (formData.role === "alumni") {
          toast.info(
            "🎉 Registration successful! Your request will be verified by our faculty. You will receive an email once verified, then you can log in."
          );
        } else {
          toast.success("🎉 Registered successfully!");
          Navigate("/login");
        }

        // Reset form
        setFormData({
          role: "student",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          department: "",
          branch: "",
          passoutYear: "",
          rollNo: "",
          classRollNo: "",
          admissionNo: "",
          region: "",
          interestedIn: [],
        });
      } else {
        toast.error("⚠️ " + (data.error || "Registration failed"));
      }
    } catch (err) {
      toast.error("❌ Server error: " + err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 opacity-50"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-3xl bg-white/30 backdrop-blur-md shadow-2xl rounded-3xl p-10 grid gap-6 md:grid-cols-2"
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
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
        />

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
        />

        {/* Passout Year */}
        <input
          type="number"
          name="passoutYear"
          placeholder="Passout Year"
          value={formData.passoutYear}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
        />

        {/* Student-only Fields */}
        {formData.role === "student" && (
          <>
            <input 
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
            />
            <input
              type="text"
              name="classRollNo"
              placeholder="Class Roll Number"
              value={formData.classRollNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
            />
            <input
              type="text"
              name="admissionNo"
              placeholder="Admission Number"
              value={formData.admissionNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
            />
          </>
        )}

        {/* Alumni-only Fields */}
        {formData.role === "alumni" && (
          <>
            <input
              type="text"
              name="region"
              placeholder="Region"
              value={formData.region}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 w-full bg-white/70"
            />

            <div className="col-span-2">
              <p className="font-semibold text-gray-700 mb-2">Interested In</p>
              <div className="flex gap-4 flex-wrap">
                {interestOptions.map((item) => (
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
          </>
        )}

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
