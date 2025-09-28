import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Layers,
  MapPin,
  DollarSign,
  Star,
  Calendar,
  ArrowRight,
  Building2,
} from "lucide-react";

const PlacementPage = () => {
  const Navigate=useNavigate();
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/auth/placement-request",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPlacements(res.data || []);
      } catch (error) {
        console.error("❌ Error fetching placements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, []);

  if (loading) return <p className="p-6">Loading placements...</p>;

  // Group placements by alumniRequest.type
  const jobs = placements.filter((p) => p.alumniRequest?.type === "job");
  const internships = placements.filter(
    (p) => p.alumniRequest?.type === "internship"
  );
  const programs = placements.filter(
    (p) => p.alumniRequest?.type === "program"
  );

  const handleApply =(id)=>{
    Navigate(`/student-dashboard/placements/apply/${id}`);
  }

  // Placement Card Component
  const PlacementCard = ({ placement }) => {
    const {
      formTitle,
      companyName,
      description,
      salary,
      deadline,
      jobRole,
      eligibleDepartments,
      alumniRequest,
    } = placement;

    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all border border-gray-100 hover:border-green-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{formTitle}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
            {alumniRequest?.type?.toUpperCase()}
          </span>
        </div>

        <p className="text-gray-600 text-sm">{companyName || "Unknown"}</p>
        <p className="mt-2 text-sm text-gray-500">{description}</p>

        <div className="mt-4 text-sm text-gray-700 space-y-2">
          <p className="flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-indigo-500" />
            Department: {eligibleDepartments?.join(", ") || "N/A"}
          </p>
          <p className="flex items-center">
            <Star className="h-4 w-4 mr-2 text-yellow-500" />
            Role: {jobRole || alumniRequest?.position || "N/A"}
          </p>
          <p className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
            Salary: {salary ? `₹${salary}` : "Not specified"}
          </p>
          <p className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-pink-500" />
            Deadline:{" "}
            {deadline ? new Date(deadline).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <button onClick={() => handleApply(placement._id)}  className="mt-6 w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg shadow hover:from-green-700 hover:to-blue-700 transition flex items-center justify-center">
          Apply Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          🎓 Placement Opportunities
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Browse jobs, internships, and programs tailored for students.
        </p>
      </div>

      {/* Jobs Section */}
      {jobs.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-green-600" /> Jobs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((p) => (
              <PlacementCard key={p._id} placement={p} />
            ))}
          </div>
        </div>
      )}

      {/* Internships Section */}
      {internships.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" /> Internships
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internships.map((p) => (
              <PlacementCard key={p._id} placement={p} />
            ))}
          </div>
        </div>
      )}

      {/* Programs Section */}
      {programs.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
            <Layers className="h-6 w-6 text-purple-600" /> Programs
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <PlacementCard key={p._id} placement={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementPage;
