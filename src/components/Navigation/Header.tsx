import React from 'react';
import { GraduationCap, Users, Building, UserCheck, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AlumniConnect
              </h1>
              <p className="text-xs text-gray-500">Building Bridges, Creating Futures</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#events" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Events
            </a>
            <a href="#stories" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Success Stories
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Contact
            </a>
          </nav>

          {/* User Type Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Alumni</span>
            </button>
            <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-medium">Student</span>
            </button>
            <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
              <Building className="h-4 w-4" />
              <span className="text-sm font-medium">Placement</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
              <UserCheck className="h-4 w-4" />
              <span className="text-sm font-medium">Admin</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-4">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-4">
                About
              </a>
              <a href="#events" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-4">
                Events
              </a>
              <a href="#stories" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-4">
                Success Stories
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-4">
                Contact
              </a>
              
              <div className="grid grid-cols-2 gap-3 px-4 pt-4 border-t border-gray-200">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Alumni</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-sm font-medium">Student</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">Placement</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  <UserCheck className="h-4 w-4" />
                  <span className="text-sm font-medium">Admin</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;