import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';



export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1 for the interaction range
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled
      // We want the effect to be strongest when the section is at the top
      // 0 means section just started leaving top, 1 means section is halfway out
      const progress = Math.max(0, Math.min(1, -rect.top / (viewportHeight * 0.8)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Fallback for browsers that block autoplay
            });
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-cream"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft gradient orbs */}
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #F5A623 0%, #F7B74D 100%)' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #1B2A47 0%, #273A5E 100%)' }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #A8D5BA 0%, #A8D4E6 100%)' }}
        />
        
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-pattern-dots" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 pt-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Logo */}
          <div
            className={`mb-6 flex justify-center transition-all duration-1000 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <img src="/logo.png" alt="Little Stars Nursery logo" className="h-32 sm:h-40 md:h-48 w-auto object-contain animate-float-slow drop-shadow-2xl" />
          </div>

          {/* Main Headline */}
          <h1
            className={`font-baloo font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-4 transition-all duration-700 delay-200 ${
              isLoaded
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {t('Best Preschool in Kuwait —', 'أفضل حضانة في الكويت —')} <br className="hidden sm:block" />
            <span className="text-teal-gradient">{t('Little Stars Nursery', 'حضانة النجوم الصغيرة')}</span>
          </h1>

          {/* Arabic Subtitle */}
          <p
            className={`font-cairo text-lg sm:text-xl md:text-2xl text-secondary mb-8 transition-all duration-700 delay-400 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {t('Big Dreams Start With Little Stars', 'حيث تبدأ أحلام أطفالك الكبيرة')}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-600 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-gold text-base sm:text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span className="group-hover:scale-125 transition-transform duration-300">🌟</span>
              <span className="relative z-10">{t('Register Now', 'سجل الآن')}</span>
            </a>
            <button
              onClick={scrollToAbout}
              className="btn-outline text-base sm:text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
            >
              <span>{t('Explore', 'استكشف')}</span>
              <ChevronDown size={20} className="animate-bounce-subtle" />
            </button>
          </div>

          {/* Intro Video Card with Interactive Depth Effect */}
          <div
            className={`relative mx-auto max-w-xs transition-all duration-1000 delay-800 perspective-2000 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Background Vignette Overlay (appears on scroll) */}
            <div 
              className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-500"
              style={{ 
                opacity: Math.sin(scrollProgress * Math.PI) * 0.7,
                background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%)'
              }}
            />



            <div 
              className="glass rounded-[2rem] p-2 preserve-3d transition-all duration-300 ease-out relative group overflow-visible"
              style={{
                transform: `
                  scale(${1 + Math.sin(scrollProgress * Math.PI) * 0.15})
                  translateZ(${Math.sin(scrollProgress * Math.PI) * 100}px)
                  rotateX(${Math.sin(scrollProgress * Math.PI) * -5}deg)
                `,
                boxShadow: `0 ${20 + Math.sin(scrollProgress * Math.PI) * 40}px ${50 + Math.sin(scrollProgress * Math.PI) * 50}px rgba(27,42,71,${0.3 + Math.sin(scrollProgress * Math.PI) * 0.3})`
              }}
            >
              {/* Glass frame overlay */}
              <div className="absolute inset-0 border-2 border-white/40 rounded-[2rem] pointer-events-none z-20" />
              
              {/* Video Element */}
              <div className="relative rounded-[1.75rem] overflow-hidden aspect-[9/16] bg-black/10">
                <video
                  ref={videoRef}
                  src="/videos/Prechool intro vid.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                />
                
                {/* Overlay gradient for controls visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Unmute/Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                
                {/* Pulse indicator for the mute button */}
                {isMuted && (
                  <span className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 animate-ping pointer-events-none" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-muted hover:text-[#1B2A47] transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs mb-2">Scroll</span>
          <ChevronDown size={24} className="animate-bounce-subtle" />
        </button>
      </div>
    </section>
  );
}
