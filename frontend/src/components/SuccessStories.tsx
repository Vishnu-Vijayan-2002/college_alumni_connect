import React from 'react';
import { Quote, Star, MapPin } from 'lucide-react';

interface Story {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  story: string;
  image: string;
  rating: number;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    story: "The alumni network helped me transition from a small startup to a tech giant. The mentorship I received was invaluable.",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    story: "Through the portal, I found not just a job but a career path. The connections I made here shaped my professional journey.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Tesla",
    location: "Austin, TX",
    story: "The webinars and training sessions prepared me for the tech industry. I'm now working on autonomous driving technology!",
    image: "https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    rating: 5
  }
];

const SuccessStories: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Alumni Success Stories
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our alumni network has transformed careers and created lasting professional relationships.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-200 transition-colors duration-200"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-blue-600 font-medium">{story.role}</p>
                    <p className="text-gray-600 text-sm">{story.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center ml-4 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {story.location}
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-100" />
                  <p className="text-gray-700 italic leading-relaxed pl-6">
                    {story.story}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;