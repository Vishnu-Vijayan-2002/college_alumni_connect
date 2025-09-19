import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, DollarSign, Star, Users, ArrowRight } from 'lucide-react';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/requests/get-request')
      .then((res) => res.json())
      .then((data) => {
        const approvedJobs = data.filter(job => job.status === 'approved');
        setJobs(approvedJobs);
      })
      .catch((err) => {
        console.error('Error fetching postings:', err);
      });
  }, []);

  return (
    <div>
      <div className="text-center m-16">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Latest Job Opportunities
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Discover career opportunities posted by our alumni network. From internships to senior positions.
        </p>
      </div>

      {jobs.length === 0 ? (
        <p>No approved postings found.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-green-200 m-4"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                        {job.title}
                      </h3>
                      {/* You can add urgent flag if available */}
                    </div>
                    <p className="text-green-600 font-medium">{job.companyName}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {/* Location is not available in API, fallback to department */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{job.department || 'N/A'}</span>
                    <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    <span>{job.salary ? `$${job.salary}` : 'N/A'}</span>
                  </div>

                  {/* Experience field is not available, you can omit or replace */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{job.position || 'N/A'}</span>
                  </div>

                  {/* Applicants field is missing, so omit or default */}
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2 text-purple-500" />
                    <span>{'N/A'} applicants</span>
                  </div>
                </div>

                {/* Tags are missing, so omit or add dummy tags */}

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-3">
                    {/* postedBy and postedDate missing, so omit or provide fallback */}
                    Posted by N/A • N/A
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
      )}
    </div>
  );
};

export default JobListings;



