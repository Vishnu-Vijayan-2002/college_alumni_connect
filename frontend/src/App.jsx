import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Landing page sections
import Header from "./components/Header";
import Hero from "./components/Hero";
import JobOpportunities from "./components/JobOpportunities";
import MentorshipProgram from "./components/MentorshipProgram";
import SuccessStories from "./components/SuccessStories";
import Testimonials from "./components/Testimonials";
import NewsUpdates from "./components/NewsUpdates";
import NetworkingForum from "./components/NetworkingForum";
import ResourceCenter from "./components/ResourceCenter";
import FeaturedAlumni from "./components/FeaturedAlumni";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import UpcomingEvents from "./components/UpcomingEvents";
import AdminDashboard from "./pages/admin-side/AdminDashboard";
import PlacementRequestsPage from "./pages/placementcell/PlacementRequestsPage";

// Auth pages
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard";
import JobListings from "./pages/JobListings";

// Dashboards & Protected routes
import PlacementcellDashboard from "./pages/placementcell/PlacementcellDashboard";
import AlumniDashboard from "./pages/alumni-side/AlumniDashboard";
import ApplicantsPage from "./pages/placementcell/ApplicantsPage ";
import PlacementFormsPage from "./pages/placementcell/PlacementFormsPage";
import PlacementFormDetailPage from "./pages/placementcell/PlacementFormDetailPage";
import PlacementPage from "./pages/student-side/PlacementPage";
import PlacementApply from "./pages/student-side/PlacementApply";

// Pages
// import RegisterForm from "./pages/RegisterForm";
// import LoginForm from "./pages/LoginForm";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/placement-dashboard" ||
    location.pathname === "/student-dashboard";

  return (
    <div className="min-h-screen bg-white">
      
      {!hideHeader && <Header />}

      <Routes>
        {/* Home page with all sections */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <JobOpportunities />
              <MentorshipProgram />
              <SuccessStories />
              <Testimonials />
              <NewsUpdates />
              <UpcomingEvents />
              <NetworkingForum />
              <ResourceCenter />
              <FeaturedAlumni />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Register & Login pages */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />


        {/* Protected Dashboard pages */}

        

        {/* Protected Dashboards */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/placement-dashboard"
          element={
            <ProtectedRoute allowedRoles={["placement-cell"]}>
              <PlacementcellDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/placement-requests"
          element={
            <ProtectedRoute allowedRoles={["placement-cell"]}>
            <PlacementRequestsPage />
          </ProtectedRoute>
        }
      />
      <Route
          path="/placement-dashboard/applicants/:requestId" 
          element={
            <ProtectedRoute allowedRoles={["placement-cell"]}>
            <ApplicantsPage/>
          </ProtectedRoute>
        }
      />
      <Route
          path="/placement-forms"
          element={
            <ProtectedRoute allowedRoles={["placement-cell"]}>
              <PlacementFormsPage/>
            </ProtectedRoute>
          }
        />
         <Route
          path="placement-form/:placementId"
          element={
            <ProtectedRoute allowedRoles={["placement-cell"]}>
              <PlacementFormDetailPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/student-dashboard/placements"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <PlacementPage/>
             
            </ProtectedRoute>
          }
        />
         <Route
          path="/student-dashboard/placements/apply/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <PlacementApply/>             
            </ProtectedRoute>
          }
        />
{/* <Route path="/" element={<AlumniDashboard />} /> */}
     <Route
          path="/alumni-dashboard"
          element={
            <ProtectedRoute allowedRoles={["alumni"]}>
              <AlumniDashboard />
            </ProtectedRoute>
          }
        />

        {/* Job listings (public or protected?) */}
        <Route path="/job-listing" element={<JobListings />} />
      </Routes>
    </div>
  );
}

export default App;
