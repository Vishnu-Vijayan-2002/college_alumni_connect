import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import {
  Menu,
  X,
  Users,
  GraduationCap,
  Briefcase,
  Calendar,
  MessageCircle,
  BookOpen,
  Award,
  Settings,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Users },
    { name: "Alumni", path: "/alumni", icon: GraduationCap },
    { name: "Students", path: "/students", icon: Briefcase },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Forums", path: "/forums", icon: MessageCircle },
    { name: "Resources", path: "/resources", icon: BookOpen },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Alumni Connect
              </h1>
              <p className="text-xs text-gray-500">College Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors duration-200">
              <Award className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors duration-200">
              <Settings className="h-5 w-5" />
            </button>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-3 rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-left"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
