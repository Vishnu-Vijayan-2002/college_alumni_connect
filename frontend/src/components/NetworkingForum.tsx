import React from 'react';
import { MessageCircle, Users, TrendingUp, Clock, ThumbsUp, MessageSquare, Eye } from 'lucide-react';

interface ForumTopic {
  id: number;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  timeAgo: string;
  replies: number;
  likes: number;
  views: number;
  isHot: boolean;
  tags: string[];
}

const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: "Tips for Landing Your First Job in Tech",
    category: "Career Advice",
    author: "Sarah Johnson",
    authorRole: "Senior SWE at Google",
    timeAgo: "2 hours ago",
    replies: 24,
    likes: 45,
    views: 312,
    isHot: true,
    tags: ["Career", "Tech", "Interview"]
  },
  {
    id: 2,
    title: "Study Abroad Scholarships - Complete Guide",
    category: "International Education",
    author: "Michael Chen",
    authorRole: "MS at Stanford",
    timeAgo: "5 hours ago",
    replies: 18,
    likes: 32,
    views: 256,
    isHot: true,
    tags: ["Scholarships", "Study Abroad", "Masters"]
  },
  {
    id: 3,
    title: "Starting a Tech Startup: Lessons Learned",
    category: "Entrepreneurship",
    author: "Emily Rodriguez",
    authorRole: "Founder at TechStart",
    timeAgo: "1 day ago",
    replies: 31,
    likes: 67,
    views: 489,
    isHot: false,
    tags: ["Startup", "Entrepreneurship", "Funding"]
  },
  {
    id: 4,
    title: "Remote Work Best Practices",
    category: "Career Planning",
    author: "Alex Thompson",
    authorRole: "Product Manager",
    timeAgo: "2 days ago",
    replies: 15,
    likes: 28,
    views: 198,
    isHot: false,
    tags: ["Remote Work", "Productivity", "Work-Life Balance"]
  }
];

const categories = [
  { name: "Career Advice", count: 156, color: "bg-blue-100 text-blue-800" },
  { name: "Study Abroad", count: 89, color: "bg-green-100 text-green-800" },
  { name: "Entrepreneurship", count: 67, color: "bg-purple-100 text-purple-800" },
  { name: "Career Planning", count: 134, color: "bg-orange-100 text-orange-800" },
  { name: "Industry Insights", count: 98, color: "bg-pink-100 text-pink-800" }
];

const NetworkingForum: React.FC = () => {
  return (
    <section id="forums" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Networking & Discussion Forums
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with peers, share experiences, and get advice from our vibrant alumni community.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${category.color}`}>
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Start New Discussion
              </button>
            </div>
          </div>

          {/* Forum Topics */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Discussions</h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Hot</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">Recent</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">Popular</button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {forumTopics.map((topic) => (
                  <div key={topic.id} className="p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                            {topic.title}
                          </h4>
                          {topic.isHot && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Hot
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {topic.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="font-medium">{topic.author}</span>
                              <span className="mx-1">•</span>
                              <span>{topic.authorRole}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {topic.timeAgo}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {topic.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {topic.replies}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {topic.views}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-100 text-center">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                  Load More Discussions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Forum Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2,500+</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">15,000+</div>
            <div className="text-sm text-gray-600">Discussions</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2 hrs</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkingForum;