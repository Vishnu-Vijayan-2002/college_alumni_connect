import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Users, ArrowRight, Star } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary: string;
  experience: string;
  postedBy: string;
  postedDate: string;
  applicants: number;
  tags: string[];
  urgent: boolean;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    experience: "3-5 years",
    postedBy: "Sarah Johnson (Class of 2015)",
    postedDate: "2 days ago",
    applicants: 24,
    tags: ["React", "Node.js", "AWS"],
    urgent: true
  },
  {
    id: 2,
    title: "Product Manager Intern",
    company: "StartupXYZ",
    location: "Remote",
    type: "Internship",
    salary: "$25/hour",
    experience: "0-1 years",
    postedBy: "Michael Chen (Class of 2018)",
    postedDate: "1 week ago",
    applicants: 45,
    tags: ["Product Strategy", "Analytics", "Agile"],
    urgent: false
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "AI Innovations",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    experience: "2-4 years",
    postedBy: "Emily Rodriguez (Class of 2016)",
    postedDate: "3 days ago",
    applicants: 18,
    tags: ["Python", "Machine Learning", "SQL"],
    urgent: false
  }
];

const JobOpportunities: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Job Opportunities
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover career opportunities posted by our alumni network. From internships to senior positions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-green-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                        {job.title}
                      </h3>
                      {job.urgent && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-green-600 font-medium">{job.company}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{job.location}</span>
                    <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{job.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2 text-purple-500" />
                    <span>{job.applicants} applicants</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-3">
                    Posted by {job.postedBy} • {job.postedDate}
                  </p>
                  <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group">
                    Apply Now
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200">
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobOpportunities;