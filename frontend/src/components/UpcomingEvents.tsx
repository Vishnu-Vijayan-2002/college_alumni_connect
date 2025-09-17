import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'webinar' | 'workshop' | 'networking';
  attendees: number;
  maxAttendees: number;
  speaker: string;
  isVirtual: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: "Career Transition in Tech Industry",
    description: "Join industry experts as they share insights on successfully transitioning careers in the technology sector.",
    date: "Jan 25, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Virtual Event",
    type: "webinar",
    attendees: 145,
    maxAttendees: 200,
    speaker: "Sarah Johnson, Google",
    isVirtual: true
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering the fundamentals of AI and ML with practical applications and case studies.",
    date: "Jan 28, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Campus Auditorium",
    type: "workshop",
    attendees: 78,
    maxAttendees: 100,
    speaker: "Dr. Michael Chen, Microsoft",
    isVirtual: false
  },
  {
    id: 3,
    title: "Alumni Networking Mixer",
    description: "Connect with fellow alumni and current students in a relaxed networking environment with refreshments.",
    date: "Feb 2, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "University Club",
    type: "networking",
    attendees: 120,
    maxAttendees: 150,
    speaker: "Alumni Association",
    isVirtual: false
  }
];

const getEventTypeColor = (type: Event['type']) => {
  switch (type) {
    case 'webinar':
      return 'bg-blue-100 text-blue-800';
    case 'workshop':
      return 'bg-green-100 text-green-800';
    case 'networking':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Upcoming Webinars & Training
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Join our upcoming events to enhance your skills, expand your network, and stay ahead in your career.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  {event.isVirtual && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                      Virtual
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {event.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-3 text-green-500" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 text-purple-500" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-3 text-orange-500" />
                    <span className="text-sm">
                      {event.attendees}/{event.maxAttendees} registered
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Speaker</p>
                    <p className="text-sm font-medium text-gray-900">{event.speaker}</p>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center group">
                    Register
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>Registration Progress</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;