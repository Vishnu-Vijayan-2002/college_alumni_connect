import React from 'react';
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  AlumniConnect
                </h3>
                <p className="text-xs text-gray-400">Building Bridges, Creating Futures</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting generations of learners and professionals through verified networking, 
              mentorship, and career opportunities.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'Alumni Registration',
                'Student Portal',
                'Success Stories',
                'Events & Webinars',
                'Career Opportunities',
                'Mentorship Program'
              ].map((link) => (
                <li key={link}>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-lg font-semibold mb-6">For Users</h4>
            <ul className="space-y-3">
              {[
                'Alumni Login',
                'Student Login',
                'Placement Cell',
                'Chapter Heads',
                'Help Center',
                'Privacy Policy'
              ].map((link) => (
                <li key={link}>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">contact@alumniconnect.edu</p>
                  <p className="text-gray-300">placement@alumniconnect.edu</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-300">+1 (555) 765-4321</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 University Avenue</p>
                  <p className="text-gray-300">Education City, EC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 AlumniConnect. All rights reserved. Built with ❤️ for our academic community.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </button>
              <button className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-gray-300 hover:text-white transition-colors duration-200">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;