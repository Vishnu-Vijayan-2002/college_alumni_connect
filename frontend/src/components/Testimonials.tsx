import React from 'react';
import { Quote, Star, Play } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  rating: number;
  image: string;
  videoUrl?: string;
  category: 'student' | 'alumni' | 'mentor';
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Final Year Student",
    company: "Computer Science",
    testimonial: "The alumni mentorship program completely transformed my career trajectory. Through this platform, I connected with a senior engineer at Google who guided me through interview preparation and helped me land my dream job.",
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    category: "student"
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    role: "Senior Data Scientist",
    company: "Microsoft",
    testimonial: "Being part of this alumni network has been incredibly rewarding. I've been able to give back to my college community while also expanding my own professional network. The platform makes it easy to connect with both students and fellow alumni.",
    rating: 5,
    image: "https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    videoUrl: "#",
    category: "alumni"
  },
  {
    id: 3,
    name: "Ankit Kumar",
    role: "Recent Graduate",
    company: "Software Engineer at Amazon",
    testimonial: "The job opportunities posted by alumni were game-changers. I found my current position through a referral from an alumnus I met on this platform. The networking events and webinars also provided invaluable industry insights.",
    rating: 5,
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    category: "student"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "VP Engineering",
    company: "Netflix",
    testimonial: "This platform has revolutionized how we connect with our alma mater. I've mentored over 50 students and helped place 15 of them in top tech companies. It's amazing to see the impact we can make together.",
    rating: 5,
    image: "https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    category: "mentor"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from students, alumni, and mentors about their transformative experiences on our platform.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {testimonial.videoUrl && (
                        <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors duration-200">
                          <Play className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-blue-600 font-medium">{testimonial.role}</p>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      testimonial.category === 'student' ? 'bg-green-100 text-green-800' :
                      testimonial.category === 'alumni' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {testimonial.category}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-100" />
                  <p className="text-gray-700 leading-relaxed pl-6 italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Video Testimonials</h3>
            <p className="text-gray-600">Watch our community members share their success stories</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden">
                  <img
                    src={`https://images.pexels.com/photos/318040${index}/pexels-photo-318040${index}.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop`}
                    alt={`Video testimonial ${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <h4 className="font-semibold text-gray-900">Success Story #{index}</h4>
                  <p className="text-sm text-gray-600">2:30 min</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of our thriving community and start your journey towards professional success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Join as Student
            </button>
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
              Join as Alumni
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;