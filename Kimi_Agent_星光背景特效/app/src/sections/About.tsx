import { useState } from 'react';
import { useScrollAnimation, useMouseTilt } from '../hooks/useScrollAnimation';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import WaveSeparator from '../components/WaveSeparator';

const features = [
  { icon: '🎮', label: 'Play-Based Learning', labelAr: 'تعلم قائم على اللعب' },
  { icon: '🗣️', label: 'Bilingual Arabic+English', labelAr: 'ثنائي اللغة' },
  { icon: '🕌', label: 'Islamic Values', labelAr: 'قيم إسلامية' },
  { icon: '🔒', label: 'Safe & Secure', labelAr: 'آمن ومأمون' },
  { icon: '📸', label: 'Daily Photo Updates', labelAr: 'تحديثات يومية' },
  { icon: '🎓', label: 'Annual Graduation', labelAr: 'تخرج سنوي' },
];

const imageCards = [
  { 
    emoji: '🎨', 
    label: 'Creative Arts', 
    labelAr: 'الفنون الإبداعية',
    color: 'from-[#FF8B7B] to-[#FFB5AA]',
    rotate: '-6deg',
    translateY: '0',
    floatAnimation: 'animate-float-gentle',
    animType: 'bounceIn' as const,
  },
  { 
    emoji: '📚', 
    label: 'Learning', 
    labelAr: 'التعلم',
    color: 'from-[#F5A623] to-[#F7B74D]',
    rotate: '3deg',
    translateY: '-20px',
    floatAnimation: 'animate-float-delayed',
    animType: 'elasticIn' as const,
  },
  { 
    emoji: '🌱', 
    label: 'Growth', 
    labelAr: 'النمو',
    color: 'from-[#A8D5BA] to-[#B8E8C8]',
    rotate: '6deg',
    translateY: '10px',
    floatAnimation: 'animate-float-slow',
    animType: 'rotateIn' as const,
  },
];

function TiltCard({ card, index }: { card: typeof imageCards[0]; index: number }) {
  const { ref, transform } = useMouseTilt();
  const { ref: scrollRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const [isWiggling, setIsWiggling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTransform = () => {
    if (isVisible) {
      return `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) rotate(${card.rotate}) translateY(${card.translateY})`;
    }
    return `rotateX(20deg) rotate(${card.rotate}) translateY(40px)`;
  };

  const handleClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  };

  return (
    <div
      ref={scrollRef}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        ref={ref}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-full aspect-[4/5] rounded-3xl bg-gradient-to-br ${card.color} 
          p-6 flex flex-col items-center justify-center shadow-lg 
          preserve-3d transition-all duration-200 cursor-pointer
          hover:shadow-2xl
          ${isWiggling ? 'animate-wiggle' : ''}
          ${isVisible ? card.floatAnimation : ''}
          ${isHovered ? 'scale-110' : ''}
        `}
        style={{ 
          transform: getTransform(),
          animationDelay: `${index * 300}ms`,
        }}
      >
        {/* Sparkle decorations */}
        <span className="absolute top-3 right-3 text-lg animate-twinkle">✨</span>
        <span className="absolute bottom-3 left-3 text-sm animate-twinkle-delayed">⭐</span>
        <span className={`absolute top-8 left-4 text-xs transition-all duration-300 ${isHovered ? 'opacity-100 scale-150' : 'opacity-40'}`}>💫</span>
        
        <div className={`text-6xl sm:text-7xl mb-4 transition-transform duration-300 ${isHovered ? 'scale-125 rotate-12' : ''}`}>
          {card.emoji}
        </div>
        <div className="text-white font-bold text-center drop-shadow-md">{card.label}</div>
        <div className="font-cairo text-white/80 text-sm text-center">{card.labelAr}</div>
        
        {/* Shine effect */}
        <div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none"
          style={{ transform: `translateX(${transform.rotateY * 2}px) translateY(${-transform.rotateX * 2}px)` }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { t, language } = useLanguage();
  
  // New playful scroll animations
  const { ref: titleRef, className: titleClassName, style: titleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideLeft', delay: 0 });
  const { ref: subtitleRef, className: subtitleClassName, style: subtitleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideLeft', delay: 200 });
  const { ref: descRef, className: descClassName, style: descStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 300 });
  const { ref: featuresRef, isVisible: featuresVisible } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 400 });

  return (
    <section id="about" className="relative py-16 sm:py-24 section-cream overflow-hidden">
      {/* Wave separator at top */}
      <WaveSeparator color="#FAF8F5" flip className="top-0" />

      {/* Floating decorative stars */}
      <div className="absolute top-10 left-[5%] text-3xl animate-float-slow opacity-30 pointer-events-none">⭐</div>
      <div className="absolute top-1/3 right-[8%] text-2xl animate-float-delayed opacity-20 pointer-events-none">✨</div>
      <div className="absolute bottom-20 left-[15%] text-xl animate-twinkle opacity-20 pointer-events-none">🌟</div>
      <div className="absolute top-1/2 right-[5%] text-lg animate-bounce-gentle opacity-15 pointer-events-none">💫</div>
      <div className="absolute bottom-10 right-[10%] text-2xl animate-float-gentle opacity-25 pointer-events-none">⭐</div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#F5A623]/10" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-[#1B2A47]/5" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={language === 'ar' ? 'text-right' : 'text-left'}>
            {/* Tag with bounce */}
            <div
              ref={titleRef}
              className={titleClassName}
              style={titleStyle}
            >
              <span className="section-tag inline-flex items-center gap-2">
                <span className="animate-bounce-inline">⭐</span>
                {t('Our Story', 'قصتنا')}
              </span>
            </div>

            {/* Headline with enhanced animation */}
            <div
              ref={subtitleRef}
              className={subtitleClassName}
              style={subtitleStyle}
            >
              <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-4">
                {t('Nurturing Little Stars Since 1999', 'نرعى النجوم الصغيرة منذ عام 1999')}
                <span className="inline-block animate-bounce-gentle ml-2">🌟</span>
              </h2>
            </div>

            {/* Description with enhanced animation */}
            <div
              ref={descRef}
              className={descClassName}
              style={descStyle}
            >
              <p className="text-secondary text-base sm:text-lg leading-relaxed mb-8">
                {t(
                  "Little Stars Nursery is Kuwait's beloved play-based preschool and baby school in Siddeeq. Our professional nannies in Siddeeq and certified teachers nurture children aged 1 month to 5 years, blending international learning with Islamic values and Kuwaiti culture. We are recognized as the best preschool in Kuwait for early childhood development.",
                  "حضانة النجوم الصغيرة هي أفضل حضانة في الكويت وروضة أطفال في منطقة الصديق. فريقنا المكون من مربيات محترفات ومعلمات مؤهلات يرعى الأطفال من عمر شهر واحد إلى 5 سنوات، بمزج التعلم الدولي مع القيم الإسلامية والثقافة الكويتية. نحن نعتبر أفضل حضانة في الصديق للتعليم المبكر."
                )}
              </p>
            </div>

            {/* Feature Pills with staggered pop-in */}
            <div ref={featuresRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map((feature, index) => (
                <div
                  key={feature.label}
                  className={`
                    feature-pill transition-all duration-500 cursor-pointer
                    hover:scale-105 hover:bg-[#1B2A47]/10 hover:shadow-md
                    ${featuresVisible ? 'animate-pop-in' : 'opacity-0 scale-50'}
                    ${language === 'ar' ? 'flex-row-reverse' : ''}
                  `}
                  style={{ 
                    transitionDelay: `${400 + index * 80}ms`,
                    animationDelay: `${400 + index * 80}ms`,
                  }}
                >
                  <span className="text-lg animate-bounce-gentle" style={{ animationDelay: `${index * 100}ms` }}>
                    {feature.icon}
                  </span>
                  <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs font-medium">{t(feature.label, feature.labelAr)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Cards with floating animation */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 perspective-1000">
            {imageCards.map((card, index) => (
              <TiltCard key={card.label} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Wave separator at bottom */}
      <WaveSeparator color="#FAF8F5" className="bottom-0" />
    </section>
  );
}
