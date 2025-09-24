import React, { useEffect, useState } from "react";
import { Users, BookOpen, Briefcase, Settings } from "lucide-react";
import axios from "axios";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DashboardContent = () => {
  const [faculty, setFaculty] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [facultyRes, alumniRes] = await Promise.all([
          axios.get("http://localhost:5000/api/faculty/get-all-faculty", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/alumni/get-all-alumni", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setFaculty(facultyRes.data?.faculties || []);
        setAlumni(alumniRes.data || []);
        setLoading(false);
        console.log(alumni);
        
      } catch (error) {
        console.error(error);
        setFaculty([]);
        setAlumni([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pie chart: Faculty vs Alumni
  const roleDistribution = [
    { name: "Faculty", value: faculty.length },
    { name: "Alumni", value: alumni.length },
  ];
  const COLORS = ["#2563eb", "#16a34a"];

  // Pie chart: Alumni request status (using verificationStatus)
  const alumniStatusDistribution = [
    { name: "Pending", value: alumni.filter(a => a.verificationStatus === "pending").length },
    { name: "Verified", value: alumni.filter(a => a.verificationStatus === "verified").length },
    { name: "Rejected", value: alumni.filter(a => a.verificationStatus === "rejected").length },
  ];
  const STATUS_COLORS = ["#facc15", "#16a34a", "#ef4444"];

  if (loading) return <p className="p-6 text-gray-600">Loading dashboard data...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">{faculty.length + alumni.length}</h4>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <BookOpen className="text-green-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">{faculty.length}</h4>
            <p className="text-gray-500 text-sm">Faculty</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Briefcase className="text-yellow-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">{alumni.length}</h4>
            <p className="text-gray-500 text-sm">Alumni</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Settings className="text-purple-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">2</h4>
            <p className="text-gray-500 text-sm">Active APIs</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie 1: Faculty vs Alumni */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">🎓 Faculty vs Alumni</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie 2: Alumni Request Status */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Alumni Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alumniStatusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {alumniStatusDistribution.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
