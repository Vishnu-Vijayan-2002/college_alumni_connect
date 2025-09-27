import React, { useEffect, useState } from "react";
import { Briefcase , BookOpen, Calendar, Award } from "lucide-react";
import UpcomingEvents from "../components/UpcomingEvents";
import NewsUpdates from "../components/NewsUpdates";
import JobOpportunities from "../components/JobOpportunities";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const Navigate=useNavigate();
    const [user,setUser]=useState({
        name:"",
        email:"",
        role:"",
        rollNo:"",
        classRollNo:"",
        admissionNo:"",
        department:"",
        branch:"",
        passoutYear:"",
        profileImage:""
        
    })
    useEffect(()=>{
    //  const storeName=localStorage.getItem("userName");
    //  const storeEmail=localStorage.getItem("userEmail");
    //  const storeRole=localStorage.getItem("role");
     const storeImage=localStorage.getItem("profileImage")||"https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
     const storeData=JSON.parse(localStorage.getItem("user"));
 setUser({
    name: storeData.name || "",
    email: storeData.email || "",
    role: storeData.role || "",
    rollNo:storeData.rollNo||"",
    classRollNo:storeData.classRollNo||"",
    admissionNo:storeData.admissionNo||"",
    department:storeData.department||"",
    branch:storeData.branch||"",
    passoutYear:storeData.passoutYear||"",
    profileImage: storeImage,
  });
    },[])

    // logout session
    const handleLogout=()=>{
      localStorage.clear();
      Navigate('/');
      
    }
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-blue-700">Hi {user.name}</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition">
          Logout
        </button>
      </header>

      {/* Profile Section */}
     <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex items-center gap-6">
  {/* Profile Image */}
  <img
    src={user.profileImage}
    alt="Profile"
    className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-md"
  />

  {/* Profile Details */}
  <div className="flex-1">
    <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

    {/* Role Badge */}
    <span className="inline-block mt-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full shadow-sm">
      {user.role}
    </span>

    {/* Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-6 text-gray-600">
      <p>
        <span className="font-semibold text-gray-700">Roll No:</span> {user.rollNo}
      </p>
      <p>
        <span className="font-semibold text-gray-700">Class Roll No:</span> {user.classRollNo}
      </p>
      <p>
        <span className="font-semibold text-gray-700">Department:</span> {user.department}
      </p>
      <p>
        <span className="font-semibold text-gray-700">Branch:</span> {user.branch}
      </p>
      <p>
        <span className="font-semibold text-gray-700">Admission No:</span> {user.admissionNo}
      </p>
      <p>
        <span className="font-semibold text-gray-700">Passout Year:</span> {user.passoutYear}
      </p>
    </div>
  </div>
</div>


      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Applied Applications */}
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
    <div className="flex items-center gap-4 mb-4">
      <BookOpen className="text-blue-500 w-8 h-8" />
      <h3 className="text-lg font-semibold text-gray-700">Applied Applications</h3>
    </div>
    <p className="text-gray-500">View the jobs, internships, and programs you’ve applied for.</p>
  </div>

  {/* Events */}
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
    <div className="flex items-center gap-4 mb-4">
      <Calendar className="text-purple-500 w-8 h-8" />
      <h3 className="text-lg font-semibold text-gray-700">Events</h3>
    </div>
    <p className="text-gray-500">Check upcoming workshops, webinars & alumni meets.</p>
  </div>

  {/* placements */}
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"  onClick={() => Navigate("/student-dashboard/placements")}>
    <div className="flex items-center gap-4 mb-4">
      <Briefcase className="text-green-500 w-8 h-8" />
      <h3 className="text-lg font-semibold text-gray-700">Placements</h3>
    </div>
  </div>
</div>

      <div style={{marginTop:'70px'}}>
        <UpcomingEvents></UpcomingEvents>
      </div>
      <div style={{marginTop:'70px'}}>
       <NewsUpdates/>
      </div>
      <div style={{marginTop:'70px'}}>
       <JobOpportunities/>
      </div>
    </div>
  );
}

export default StudentDashboard;
