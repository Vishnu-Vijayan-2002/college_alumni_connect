import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

const NewsSection: React.FC = () => {
  const { newsUpdates } = useAppSelector((state) => state.content);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'placement':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-blue-100 text-blue-800';
      case 'achievement':
        return 'bg-purple-100 text-purple-800';
      case 'announcement':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">News & Updates</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest developments, achievements, and opportunities in our alumni community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {newsUpdates.map((news, index) => (
            <div
              key={news.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {news.image && (
                <div className={`overflow-hidden ${index === 0 ? 'h-64' : 'h-48'}`}>
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                    <Tag className="h-3 w-3 mr-1" />
                    {news.category.replace('_', ' ').toUpperCase()}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(news.date).toLocaleDateString()}
                  </div>
                </div>

                <h3 className={`font-bold text-gray-900 mb-3 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                  {news.title}
                </h3>
                
                <p className={`text-gray-600 leading-relaxed mb-4 ${index === 0 ? 'text-base' : 'text-sm'}`}>
                  {news.content}
                </p>

                <button className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;