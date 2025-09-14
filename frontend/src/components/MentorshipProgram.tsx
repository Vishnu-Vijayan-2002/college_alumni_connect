import React from 'react';
import { Users, MessageCircle, Target, TrendingUp, Star, ArrowRight } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  experience: string;
  rating: number;
  sessions: number;
  image: string;
  available: boolean;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Senior Data Scientist",
    company: "Google",
    expertise: ["Machine Learning", "AI", "Python", "Career Guidance"],
    experience: "8+ years",
    rating: 4.9,
    sessions: 156,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    available: true
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Manager",
    company: "Microsoft",
    expertise: ["Product Strategy", "Leadership", "Agile", "Startups"],
    experience: "6+ years",
    rating: 4.8,
    sessions: 89,
    image: "https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    available: true
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Software Architect",
    company: "Amazon",
    expertise: ["System Design", "Cloud", "Microservices", "Leadership"],
    experience: "10+ years",
    rating: 4.9,
    sessions: 203,
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    available: false
  }
];

const stats = [
  { icon: Users, label: "Active Mentors", value: "250+", color: "text-blue-600" },
  { icon: MessageCircle, label: "Sessions Completed", value: "2,500+", color: "text-green-600" },
  { icon: Target, label: "Success Rate", value: "94%", color: "text-purple-600" },
  { icon: TrendingUp, label: "Career Growth", value: "85%", color: "text-orange-600" }
];

const MentorshipProgram: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Alumni Mentorship Program
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with experienced alumni mentors who can guide your career journey and help you achieve your professional goals.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Mentors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Mentors</h3>
          <div className="grid gap-8 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{mentor.name}</h4>
                      <p className="text-blue-600 font-medium">{mentor.role}</p>
                      <p className="text-gray-600 text-sm">{mentor.company}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${mentor.available ? 'bg-green-400' : 'bg-gray-400'}`} />
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {mentor.rating} ({mentor.sessions} sessions)
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">{mentor.experience} experience</p>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={!mentor.available}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group ${
                      mentor.available
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {mentor.available ? 'Request Mentorship' : 'Currently Unavailable'}
                    {mentor.available && (
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Mentorship Works</h3>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Mentor</h4>
              <p className="text-gray-600">Browse through our verified alumni mentors and select based on your career interests and goals.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Schedule Sessions</h4>
              <p className="text-gray-600">Book one-on-one sessions with your mentor through our integrated scheduling system.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Grow Your Career</h4>
              <p className="text-gray-600">Receive personalized guidance, industry insights, and career advice to accelerate your professional growth.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipProgram;