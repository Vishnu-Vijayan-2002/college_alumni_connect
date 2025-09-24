import React from 'react';
import { GraduationCap, Facebook, Twitter, Linkedin as LinkedIn, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Alumni Connect</h3>
                <p className="text-sm text-gray-400">College Portal</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Bridging the gap between alumni and students through meaningful connections, 
              career opportunities, and lifelong professional relationships. Join our thriving 
              community of successful professionals and ambitious students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <LinkedIn className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-pink-600 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Alumni Directory</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Job Opportunities</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Mentorship Program</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Success Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Events & Webinars</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Report Issue</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Alumni Connect Portal. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            Made with ❤️ for our college community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;