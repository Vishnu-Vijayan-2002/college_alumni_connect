import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Calendar, Clock, Users, UserCheck, Video, BookOpen, Building } from 'lucide-react';

const EventsSection: React.FC = () => {
  const { upcomingEvents } = useAppSelector((state) => state.content);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'webinar':
        return Video;
      case 'training':
        return BookOpen;
      case 'career_fair':
        return Building;
      default:
        return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'webinar':
        return 'from-blue-500 to-blue-600';
      case 'training':
        return 'from-green-500 to-green-600';
      case 'career_fair':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Webinars & Training</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our expert-led sessions designed to accelerate your career growth and expand your professional network.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => {
            const IconComponent = getEventIcon(event.type);
            const progressPercentage = event.maxParticipants 
              ? (event.currentParticipants / event.maxParticipants) * 100 
              : 0;

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getEventColor(event.type)} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                      {event.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>{event.time}</span>
                    </div>
                    {event.speaker && (
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <UserCheck className="h-4 w-4 text-purple-500" />
                        <span>{event.speaker}</span>
                      </div>
                    )}
                  </div>

                  {/* Registration Progress */}
                  {event.maxParticipants && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Registration</span>
                        </span>
                        <span>{event.currentParticipants}/{event.maxParticipants}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Registration Button */}
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      event.maxParticipants && event.currentParticipants >= event.maxParticipants
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                    disabled={event.maxParticipants ? event.currentParticipants >= event.maxParticipants : false}
                  >
                    {event.maxParticipants && event.currentParticipants >= event.maxParticipants
                      ? 'Registration Full'
                      : event.registrationRequired
                      ? 'Register Now'
                      : 'Join Event'
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;