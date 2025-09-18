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
import AdminDashboard from "./pages/AdminDashboard ";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
// import RegisterForm from "./pages/RegisterForm";
// import LoginForm from "./pages/LoginForm";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();

  // Hide header only on admin dashboard
  const hideHeader = location.pathname === "/admin-dashboard";

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
        <Route path="/login" element={< LoginForm/>} />

        {/* Protected Dashboard page */}
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>      </Routes>
    </div>
  );
}

export default App;
