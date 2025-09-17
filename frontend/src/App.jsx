import React from "react";
import { Routes, Route } from "react-router-dom";

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

// Pages
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import RegisterForm from "./pages/RegisterForm";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

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
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Protected Dashboard page */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
