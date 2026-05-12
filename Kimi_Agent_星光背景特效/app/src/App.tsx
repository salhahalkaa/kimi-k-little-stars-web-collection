import { useEffect } from 'react';
import { useScrollConfetti } from './hooks/useScrollConfetti';
import { LanguageProvider } from './context/LanguageContext';
import AnimatedBackground from './sections/AnimatedBackground';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import About from './sections/About';
import Programs from './sections/Programs';
import Activities from './sections/Activities';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import EnrollmentCTA from './sections/EnrollmentCTA';
import Contact from './sections/Contact';
import SocialBar from './sections/SocialBar';
import Footer from './sections/Footer';
import BottomNav from './sections/BottomNav';
import FloatingWhatsApp from './sections/FloatingWhatsApp';
import ScrollProgressBar from './sections/ScrollProgressBar';

function AppContent() {
  useEffect(() => {
    document.body.classList.remove('js-loading');
  }, []);

  // Initialize scroll confetti
  useScrollConfetti();

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      {/* Dynamic Animated Background */}
      <AnimatedBackground />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Main Content */}
      <div className="relative">
        <Header />
        
        <main className="relative">
          <Hero />
          <Stats />
          <About />
          <EnrollmentCTA />
          <Programs />
          <Activities />
          <WhyUs />
          <Testimonials />
          <Contact />
          <SocialBar />
        </main>

        <Footer />
      </div>

      {/* Fixed Elements */}
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
