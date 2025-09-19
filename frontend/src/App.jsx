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
import AdminDashboard from "./pages/AdminDashboard";

// Auth pages
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

// Dashboards & Protected routes
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard";
import JobListings from "./pages/JobListings";
import PlacementcellDashboard from "./pages/placementcell/PlacementcellDashboard";

// Pages
// import RegisterForm from "./pages/RegisterForm";
// import LoginForm from "./pages/LoginForm";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();

  // Hide header only on admin dashboard
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
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
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
