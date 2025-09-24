import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ import for redirect

const AdminDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate(); // ✅ useNavigate hook

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Students", icon: GraduationCap },
    { name: "Alumni", icon: Briefcase },
    { name: "Events", icon: Calendar },
    { name: "Settings", icon: Settings },
  ];

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.clear(); // clear all stored data
    navigate("/login");   // redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold text-blue-600 ${!isSidebarOpen && "hidden"}`}>
            Admin Panel
          </h1>
          <button className="md:hidden p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
        </div>

        <nav className="flex-1 px-2 py-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg mb-2 transition-all duration-200 ${
                active === item.name
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-blue-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            className="flex items-center text-red-500 hover:text-red-700"
            onClick={handleLogout} // ✅ logout
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{active}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, Admin</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Admin"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 overflow-y-auto">
          {active === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl font-bold text-blue-600">1,245</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Active Students</h3>
                <p className="text-2xl font-bold text-green-600">540</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Alumni Members</h3>
                <p className="text-2xl font-bold text-purple-600">320</p>
              </div>
            </div>
          )}

          {active === "Users" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Manage Users</h3>
              <p className="text-gray-500">Here you can add, edit, or delete users.</p>
            </div>
          )}

          {active === "Events" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <ul className="mt-2 list-disc list-inside text-gray-700">
                <li>Alumni Meet 2025</li>
                <li>Placement Workshop</li>
                <li>Career Guidance Seminar</li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
