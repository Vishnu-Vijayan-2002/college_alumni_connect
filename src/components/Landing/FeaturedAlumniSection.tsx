import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Quote, Award, Calendar } from 'lucide-react';

const FeaturedAlumniSection: React.FC = () => {
  const { featuredAlumni } = useAppSelector((state) => state.content);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Spotlight on <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Featured Alumni</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our distinguished alumni who are making remarkable contributions in their respective fields and inspiring the next generation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredAlumni.map((alumni, index) => (
            <div
              key={alumni.id}
              className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                index === 1 ? 'lg:scale-105 lg:z-10' : ''
              }`}
            >
              <div className="relative">
                <div className="h-64 overflow-hidden">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                  Class of {alumni.graduationYear}
                </div>
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{alumni.name}</h3>
                  <div className="text-lg font-semibold text-blue-600 mb-1">{alumni.position}</div>
                  <div className="text-gray-600">{alumni.company}</div>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                  <blockquote className="text-gray-600 italic leading-relaxed pl-6">
                    "{alumni.quote}"
                  </blockquote>
                </div>

                {/* Achievements */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>Key Achievements:</span>
                  </div>
                  <div className="space-y-2">
                    {alumni.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Connect with {alumni.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore Alumni Directory
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlumniSection;