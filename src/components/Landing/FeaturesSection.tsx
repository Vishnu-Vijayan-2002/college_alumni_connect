import React from 'react';
import { Users, Briefcase, Calendar, MessageSquare, Award, Shield } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Verified Alumni Network',
      description: 'Connect with authenticated alumni from your college working in top companies worldwide.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Briefcase,
      title: 'Exclusive Job Opportunities',
      description: 'Access job postings and internships shared exclusively by alumni and partner companies.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Calendar,
      title: 'Events & Webinars',
      description: 'Attend career-focused events, workshops, and mentorship sessions led by industry experts.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MessageSquare,
      title: 'Secure Messaging',
      description: 'Direct communication with alumni through our secure, moderated messaging platform.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Award,
      title: 'Mentorship Programs',
      description: 'Get paired with experienced alumni for personalized career guidance and skill development.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Secure platform with verified identities and role-specific features for safe networking.',
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Platform <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Overview</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform designed to strengthen the connection between alumni, students, and institutional staff 
            through verified networking and meaningful collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Platform Statistics */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Verified Alumni</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">2,500+</div>
              <div className="text-gray-600">Job Placements</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;