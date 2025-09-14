import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import JobOpportunities from './components/JobOpportunities';
import MentorshipProgram from './components/MentorshipProgram';
import SuccessStories from './components/SuccessStories';
import Testimonials from './components/Testimonials';
import NewsUpdates from './components/NewsUpdates';
import UpcomingEvents from './components/UpcomingEvents';
import NetworkingForum from './components/NetworkingForum';
import ResourceCenter from './components/ResourceCenter';
import FeaturedAlumni from './components/FeaturedAlumni';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
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
    </div>
  );
}

export default App;