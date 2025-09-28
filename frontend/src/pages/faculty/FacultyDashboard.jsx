import React, { useState } from "react";
import { User, Bell, Settings, LogOut, Search, Menu, Home, Users, GraduationCap } from "lucide-react";
import AlumniVerification from './AlumniVerification';
import StudentApplications from "./StudentApplications";
import { useNavigate } from "react-router-dom";

// Mock components - replace with your actual components




function FacultyDashboard() {
  const users=JSON.parse(localStorage.getItem("user"));
  console.log(users.name);
  
  const navigate=useNavigate();
  const handleLogout=()=>{
    navigate('/');
    localStorage.clear();
  }
  const [activeSection, setActiveSection] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCardClick = (section) => {
    setActiveSection(section);
  };

  const handleBack = () => {
    setActiveSection(null);
  };

  const Header = () => (
    <header className="bg-white backdrop-blur-lg bg-opacity-95 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Alumni Connect
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection(null)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  activeSection === null 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button 
                onClick={() => handleCardClick("students")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  activeSection === "students" 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="font-medium">Students</span>
              </button>
              <button 
                onClick={() => handleCardClick("alumni")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  activeSection === "alumni" 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="font-medium">Alumni</span>
              </button>
            </nav>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm text-gray-600 w-48"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button
  onClick={handleLogout}
  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
>
  <Settings className="w-4 h-4" />
  <span>Logout</span>
</button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{users.name}</p>
                <p className="text-xs text-gray-500">{users.role}</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => { setActiveSection(null); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-left hover:bg-gray-50"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => { handleCardClick("students"); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-left hover:bg-gray-50"
              >
                <Users className="w-4 h-4" />
                <span>Students</span>
              </button>
              <button 
                onClick={() => { handleCardClick("alumni"); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-left hover:bg-gray-50"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Alumni</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Alumni Connect</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering educational institutions with modern tools for student and alumni management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">f</div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">t</div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">in</div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Students</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Alumni</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Reports</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 Alumni Connect. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );

  // If a section is active, show it with header and footer
  if (activeSection === "students") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Student Applications</h2>
                <p className="text-gray-600 mt-1">Manage and review all student applications</p>
              </div>
              <StudentApplications/>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (activeSection === "alumni") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Alumni Verification</h2>
                <p className="text-gray-600 mt-1">Review and process alumni verification requests</p>
              </div>
            <div>
              <AlumniVerification/>
            </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Default dashboard view with header and footer
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-2">Welcome back,{users.name}!</h1>
                <p className="text-blue-100 text-lg">
                  Manage your students and alumni efficiently with our modern dashboard.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full -mr-12 -mb-12"></div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">Pending Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                  <p className="text-sm text-green-600 mt-1">+2 from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <Users className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-green-600 transition-colors">Approved Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
                  <p className="text-sm text-green-600 mt-1">+1 today</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <User className="w-6 h-6 text-green-600 group-hover:text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-purple-600 transition-colors">Alumni Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                  <p className="text-sm text-orange-600 mt-1">3 urgent</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                  <GraduationCap className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-orange-600 transition-colors">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">25</p>
                  <p className="text-sm text-blue-600 mt-1">Active this month</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <Users className="w-6 h-6 text-orange-600 group-hover:text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Section Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              onClick={() => handleCardClick("students")}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <Users className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors">→</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Student Applications
              </h2>
              <p className="text-gray-600 mb-4">
                View and manage all student applications with advanced filtering and sorting options.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">12 Pending</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">8 Approved</span>
              </div>
            </div>

            <div
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              onClick={() => handleCardClick("alumni")}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                  <GraduationCap className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>
                <div className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors">→</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Alumni Verification
              </h2>
              <p className="text-gray-600 mb-4">
                Review alumni verification requests and manage alumni database with ease.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">5 Requests</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">3 Urgent</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FacultyDashboard;