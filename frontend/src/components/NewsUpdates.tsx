import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New Partnership with Leading Tech Companies",
    excerpt: "We're excited to announce strategic partnerships that will create more opportunities for our students and alumni.",
    date: "Jan 15, 2025",
    readTime: "3 min read",
    category: "Partnership",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Alumni Mentorship Program Expansion",
    excerpt: "Our mentorship program has grown by 200% this year, connecting more students with industry professionals.",
    date: "Jan 12, 2025",
    readTime: "2 min read",
    category: "Program",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Record Breaking Placement Season",
    excerpt: "This year's placement drive achieved a 98% success rate with average package increases of 40%.",
    date: "Jan 10, 2025",
    readTime: "4 min read",
    category: "Achievement",
    image: "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
  }
];

const NewsUpdates: React.FC = () => {
  return (
    <section id="events"  className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest News & Updates
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest developments, achievements, and opportunities in our community.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{item.date}</span>
                  <Clock className="h-4 w-4 ml-4 mr-2" />
                  <span>{item.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                
                <button className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;