import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import {
  Menu,
  X,
  Users,
  GraduationCap,
  Briefcase,
  Calendar,
  MessageCircle,
  BookOpen,
  User,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("role");
    const storedImage = localStorage.getItem("profileImage");
  
    if (storedName) setUserName(storedName);
    if (storedRole) setUserRole(storedRole);
    if (storedImage) setProfileImage(storedImage);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    setUserRole(null);
    setProfileImage(null);
    setShowProfile(false);
    navigate("/login");
    setIsMenuOpen(false);
  };

const navItems = [
  { name: "Home", path: "/", icon: Users },
  { name: "Alumni", path: "/alumni", icon: GraduationCap },
  // { name: "Students", path: "students", icon: Briefcase },
  { name: "Events", path: "/event", icon: Calendar },
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
            <h1 className="text-xl font-bold text-gray-900">Alumni Connect</h1>
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

          {/* Auth Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {userName ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border"
                    />
                  ) : (
                    <User className="h-6 w-6 text-gray-700" />
                  )}
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          profileImage ||
                          "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {userName}
                        </p>
                        <p className="text-sm text-gray-500">{userRole}</p>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 shadow-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Auth Section (Mobile) */}
            {userName ? (
              <div className="mt-2 border-t border-gray-200 pt-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      profileImage ||
                      "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full border"
                  />
                  <div>
                    <p className="text-gray-700 font-medium">{userName}</p>
                    <p className="text-sm text-gray-500">{userRole}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-2 border-t border-gray-200 pt-2 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
