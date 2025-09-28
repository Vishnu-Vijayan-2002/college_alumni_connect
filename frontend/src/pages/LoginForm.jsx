import React, { useState } from "react";
import axios from "axios";
import MyImage from "../assets/images/tkm4.jpg";
import BackgroundImage from "../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Select API based on role
      let apiUrl = "";
      switch (formData.role) {
        case "admin":
          apiUrl = "http://localhost:5000/api/admin/login";
          break;
        case "faculty":
          apiUrl = "http://localhost:5000/api/faculty/login";
          break;
        case "alumni":
          apiUrl = "http://localhost:5000/api/auth/login";
          break;
        case "placement-cell":
          apiUrl = "http://localhost:5000/api/placement-cell/login";
          break;
        default:
          apiUrl = "http://localhost:5000/api/auth/login"; // student
      }

      // Send login request
      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data; // full response from API
      console.log("Login response:", data);

      // Extract user info (supports all roles)
      const userInfo = data.user || data.admin || data.faculty || data.placement || data;

      // Store token
      if (data.token) localStorage.setItem("token", data.token);

      // Store user info
      if (userInfo) {
        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("userId", userInfo.id || userInfo._id);
        localStorage.setItem("userName", userInfo.name);
        localStorage.setItem("userRole", userInfo.role || formData.role);
        localStorage.setItem("userEmail", userInfo.email);
        localStorage.setItem("userDepartment", userInfo.department || "");
      }

      console.log("Stored user info:", userInfo);

      // Redirect based on role
      const role = userInfo?.role || formData.role;
      const status = userInfo?.verificationStatus;

      switch (role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "faculty":
          navigate("/faculty-dashboard");
          break;
        case "placement-cell":
          navigate("/placement-dashboard");
          break;
        case "alumni":
          if (status === "verified") navigate("/alumni-dashboard");
          else
            toast.warning("Your registration is pending approval", {
              position: "top-center",
              autoClose: 2000,
            });
          break;
        default:
          navigate("/student-dashboard");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error || err.response?.data?.message || err.message || "Login failed",
        { position: "top-center", autoClose: 3000 }
      );
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
          <img src={MyImage} alt="Login Illustration" className="h-full w-full object-cover" />
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center bg-white/30 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

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
              <span className="text-blue-500 hover:underline font-semibold">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
