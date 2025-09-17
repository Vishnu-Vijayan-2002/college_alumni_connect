import React from 'react';
import { BookOpen, Download, Play, FileText, Star, Clock, Users, ArrowRight } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  type: 'ebook' | 'video' | 'template' | 'guide';
  category: string;
  description: string;
  author: string;
  downloads: number;
  rating: number;
  duration?: string;
  size?: string;
  thumbnail: string;
  isPremium: boolean;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Complete Guide to Technical Interviews",
    type: "ebook",
    category: "Career Development",
    description: "Comprehensive guide covering data structures, algorithms, and system design interviews.",
    author: "Sarah Johnson",
    downloads: 2456,
    rating: 4.8,
    size: "2.5 MB",
    thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    isPremium: false
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    type: "video",
    category: "Technology",
    description: "Learn the basics of machine learning with practical examples and hands-on projects.",
    author: "Dr. Michael Chen",
    downloads: 1834,
    rating: 4.9,
    duration: "3h 45m",
    thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    isPremium: true
  },
  {
    id: 3,
    title: "Resume Template for Tech Professionals",
    type: "template",
    category: "Career Tools",
    description: "Professional resume template optimized for technical roles and ATS systems.",
    author: "Emily Rodriguez",
    downloads: 3421,
    rating: 4.7,
    size: "1.2 MB",
    thumbnail: "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    isPremium: false
  },
  {
    id: 4,
    title: "Startup Funding Strategy Guide",
    type: "guide",
    category: "Entrepreneurship",
    description: "Step-by-step guide to raising funds for your startup, from seed to Series A.",
    author: "Alex Thompson",
    downloads: 987,
    rating: 4.6,
    size: "3.1 MB",
    thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    isPremium: true
  }
];

const categories = [
  "All Resources",
  "Career Development",
  "Technology",
  "Career Tools",
  "Entrepreneurship",
  "Study Abroad",
  "Interview Prep"
];

const getTypeIcon = (type: Resource['type']) => {
  switch (type) {
    case 'ebook':
      return BookOpen;
    case 'video':
      return Play;
    case 'template':
      return FileText;
    case 'guide':
      return BookOpen;
    default:
      return BookOpen;
  }
};

const getTypeColor = (type: Resource['type']) => {
  switch (type) {
    case 'ebook':
      return 'bg-blue-100 text-blue-800';
    case 'video':
      return 'bg-red-100 text-red-800';
    case 'template':
      return 'bg-green-100 text-green-800';
    case 'guide':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ResourceCenter: React.FC = () => {
  return (
    <section id="resources" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Resource Center
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Access curated resources, templates, and guides created by our alumni to accelerate your career growth.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200">
                <div className="relative">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    {resource.isPremium && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <TypeIcon className="h-4 w-4 text-gray-700" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-blue-600 font-medium">{resource.category}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(resource.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{resource.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Download className="h-4 w-4 mr-1" />
                      {resource.downloads}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <span>By {resource.author}</span>
                    <div className="flex items-center space-x-3">
                      {resource.duration && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.duration}
                        </div>
                      )}
                      {resource.size && (
                        <span>{resource.size}</span>
                      )}
                    </div>
                  </div>

                  <button className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group ${
                    resource.isPremium
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}>
                    {resource.isPremium ? 'Upgrade to Access' : 'Download Free'}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Resources Available</div>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                <Download className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">200+</div>
              <div className="text-sm text-gray-600">Contributors</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                <Star className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceCenter;