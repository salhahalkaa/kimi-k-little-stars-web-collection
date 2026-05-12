import { useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import WaveSeparator from '../components/WaveSeparator';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  '/videos/ameera_sports_1.mp4',
  '/GalleryImages/Image 1.png',
  '/GalleryImages/image 2.png',
  '/GalleryImages/image 3.png',
  '/GalleryImages/image 04.png',
  '/GalleryImages/4.png',
];

export default function Activities() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const { ref: titleRef, className: titleClassName, style: titleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible, handleNext]);

  return (
    <section id="activities" ref={sectionRef} className="relative py-16 sm:py-24 section-cream overflow-hidden">
      {/* Wave separator */}
      <WaveSeparator color="#FAF8F5" flip className="top-0" />

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-[10%] text-4xl animate-float-slow opacity-20 pointer-events-none">🎨</div>
      <div className="absolute bottom-20 left-[5%] text-3xl animate-float-delayed opacity-15 pointer-events-none">🧩</div>
      <div className="absolute top-1/2 left-[3%] text-2xl animate-bounce-gentle opacity-20 pointer-events-none">🏀</div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 ${titleClassName}`}
          style={titleStyle}
        >
          <span className="section-tag inline-flex items-center gap-2">
            <span className="animate-bounce-inline">📸</span>
            {t('Gallery', 'معرض الصور')}
          </span>
          <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3 mt-4">
            {t('Life at Little Stars', 'الحياة في النجوم الصغيرة')}
          </h2>
        </div>

        <div 
          className="relative h-[320px] sm:h-[450px] md:h-[550px] w-full flex items-center justify-center perspective-1000 mt-4 sm:mt-8"
        >
          {galleryItems.map((src, index) => {
            // Calculate relative position to handle infinite wrap-around visually
            let offset = index - currentIndex;
            if (offset < -2) offset += galleryItems.length;
            if (offset > 2) offset -= galleryItems.length;

            const isCenter = offset === 0;
            const isLeft = offset < 0;
            const isRight = offset > 0;
            const isVideo = src.toLowerCase().endsWith('.mp4');
            
            // Math for transforms
            const absOffset = Math.abs(offset);
            const scale = isCenter ? 1 : Math.max(1 - (absOffset * 0.15), 0.6);
            
            // Different translation values for mobile vs desktop to prevent overlap issues
            const baseTranslate = typeof window !== 'undefined' && window.innerWidth < 640 ? 55 : 45;
            const translateX = offset * baseTranslate; 
            
            const zIndex = 30 - absOffset * 10;
            // Increased opacity for side images so they are slightly visible
            const opacity = isCenter ? 1 : Math.max(1 - (absOffset * 0.15), 0.2);
            
            return (
              <div
                key={src + index}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                className={`absolute w-[180px] sm:w-[320px] md:w-[400px] lg:w-[480px] aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-1000 ease-in-out cursor-pointer preserve-3d
                  ${isCenter ? 'shadow-[0_20px_50px_rgba(27,42,71,0.4)]' : 'shadow-md'}
                `}
                style={{
                  transform: `translateX(${translateX}%) scale(${scale}) translateZ(${isCenter ? '50px' : '0px'}) rotateY(${isLeft ? '15deg' : isRight ? '-15deg' : '0deg'})`,
                  zIndex,
                  opacity,
                  pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto'
                }}
              >
                {isVideo ? (
                  <video 
                    className="w-full h-full object-cover select-none rounded-2xl sm:rounded-3xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    draggable={false}
                    preload="auto"
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                  >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={encodeURI(src)} 
                    alt={`Little Stars Nursery - Best Preschool and Baby School in Siddeeq, Kuwait - Activity ${index + 1}`} 
                    className="w-full h-full object-cover select-none rounded-2xl sm:rounded-3xl"
                    draggable={false}
                  />
                )}
                {/* Soft white wash for non-center items to match light website tone */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-white/40 rounded-2xl sm:rounded-3xl transition-all duration-1000 ease-in-out" />
                )}
                
                {/* Subtle border for premium feel */}
                <div className="absolute inset-0 border border-white/20 rounded-2xl sm:rounded-3xl pointer-events-none z-20" />
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12 sm:mt-16">
          <button 
            onClick={() => { handlePrev(); }} 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-primary hover:text-white hover:bg-[#1B2A47] transition-all shadow-md hover:scale-110" 
            aria-label="Previous item"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); }}
                className={`h-2 rounded-full transition-all duration-500 ease-out ${index === currentIndex ? 'w-8 bg-[#1B2A47]' : 'w-2 bg-[#1B2A47]/20 hover:bg-[#1B2A47]/40'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => { handleNext(); }} 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-primary hover:text-white hover:bg-[#1B2A47] transition-all shadow-md hover:scale-110" 
            aria-label="Next item"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      <WaveSeparator color="#FAF8F5" className="bottom-0" />
    </section>
  );
}
