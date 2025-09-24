import React, { useState } from "react";
import axios from "axios";
import MyImage from "../assets/images/tkm4.jpg";
import BackgroundImage from "../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";

// ✅ Import Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student", // default role
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Choose API based on role
      let apiUrl = "";
      if (formData.role === "admin") {
        apiUrl = "http://localhost:5000/api/admin/login";
      } else if (formData.role === "faculty") {
        apiUrl = "http://localhost:5000/api/auth/login";
      } else if (formData.role === "alumni") {
        apiUrl = "http://localhost:5000/api/auth/login";
      } else if (formData.role === "placement-cell") {
        apiUrl = "http://localhost:5000/api/placement-cell/login";
      } else {
        apiUrl = "http://localhost:5000/api/auth/login"; // student
      }

      // ✅ axios POST request
      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });
      const data = res.data;

      // ✅ Store token and user info in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.admin || data.user) {
        const userInfo = data.admin || data.user;
        localStorage.setItem("userId", userInfo.id);
        localStorage.setItem("userName", userInfo.name);
        localStorage.setItem("userRole", userInfo.role);
        localStorage.setItem("userEmail", userInfo.email);
        localStorage.setItem("user", JSON.stringify(userInfo));
      }

      // ✅ Redirect based on role
      const role = data.admin?.role || data.user?.role;
      const status = data.user?.verificationStatus;
      console.log(data);
      

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "faculty") {
        navigate("/faculty-dashboard");
      } else if (role === "placement-cell") {
        navigate("/placement-dashboard");
      } else if (role === "alumni") {
        if (status === "verified") {
          navigate("/alumni-dashboard");
        } else {
          // ✅ Show toast message before redirect
          toast.warning("Your registration is pending approval", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      // ✅ Show error toast
      toast.error(err.response?.data?.error || err.message || "Login failed", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 opacity-50"></div>

      <div className="relative max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={MyImage}
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center bg-white/30 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="faculty">Faculty</option>
                <option value="placement-cell">Placement Cell</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-white/70"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-5 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to={"/register"}>
              <span className="text-blue-500 hover:underline font-semibold">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer />
    </div>
  );
}
