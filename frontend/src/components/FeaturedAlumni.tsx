import React from 'react';
import { Award, MapPin, Briefcase, ExternalLink } from 'lucide-react';

interface Alumni {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  graduationYear: string;
  achievements: string[];
  bio: string;
  image: string;
  linkedIn?: string;
}

const featuredAlumni: Alumni[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "VP of Engineering",
    company: "Netflix",
    location: "San Francisco, CA",
    graduationYear: "2015",
    achievements: [
      "Led team of 200+ engineers",
      "Forbes 30 Under 30",
      "TEDx Speaker"
    ],
    bio: "Pioneering the future of streaming technology and leading diverse engineering teams to deliver world-class user experiences.",
    image: "https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    linkedIn: "https://linkedin.com/in/priyasharma"
  },
  {
    id: 2,
    name: "James Martinez",
    role: "Founder & CEO",
    company: "EcoTech Solutions",
    location: "Austin, TX",
    graduationYear: "2018",
    achievements: [
      "Founded $50M startup",
      "Climate Tech Innovator",
      "MIT Technology Review 35"
    ],
    bio: "Building sustainable technology solutions to combat climate change while creating meaningful employment opportunities.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    linkedIn: "https://linkedin.com/in/jamesmartinez"
  }
];

const FeaturedAlumni: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Spotlight on Featured Alumni
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Meet some of our most accomplished alumni who are making a significant impact in their fields.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {featuredAlumni.map((alumni) => (
            <div key={alumni.id} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
              <div className="p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {alumni.graduationYear}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{alumni.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">{alumni.role}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-2 text-green-500" />
                        <span>{alumni.company}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                        <span>{alumni.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {alumni.linkedIn && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed mt-6 mb-6">
                  {alumni.bio}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {alumni.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            View All Alumni
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlumni;