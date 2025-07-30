import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ExternalLink, Calendar, Award } from 'lucide-react';

const SuccessStoriesSection: React.FC = () => {
  const { successStories } = useAppSelector((state) => state.content);

  return (
    <section id="stories" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Alumni <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover inspiring journeys of our alumni who have transformed their careers and made significant impact in their fields.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {story.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(story.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alumni Info */}
                <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.alumni.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.alumni.name}</div>
                    <div className="text-sm text-gray-600">{story.alumni.position}</div>
                    <div className="text-sm text-blue-600 font-medium">{story.alumni.company}</div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{story.story}</p>

                {/* Achievements */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>Key Achievements:</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {story.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  <span>Read Full Story</span>
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Success Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;