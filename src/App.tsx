import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Navigation/Header';
import HeroSection from './components/Landing/HeroSection';
import FeaturesSection from './components/Landing/FeaturesSection';
import SuccessStoriesSection from './components/Landing/SuccessStoriesSection';
import NewsSection from './components/Landing/NewsSection';
import EventsSection from './components/Landing/EventsSection';
import FeaturedAlumniSection from './components/Landing/FeaturedAlumniSection';
import ContactSection from './components/Landing/ContactSection';
import Footer from './components/Landing/Footer';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <SuccessStoriesSection />
          <NewsSection />
          <EventsSection />
          <FeaturedAlumniSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;