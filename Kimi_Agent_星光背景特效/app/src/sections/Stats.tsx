import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';
import { useClickStars } from '../hooks/useClickStars';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import { useLanguage } from '../context/LanguageContext';

interface StatItemProps {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  labelAr: string;
  delay: number;
  isVisible: boolean;
  index: number;
}

function StatItem({ icon, value, suffix, label, labelAr, delay, isVisible, index }: StatItemProps) {
  const { count, startAnimation } = useCountUp(value, 2000);
  const hasAnimated = useRef(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, startAnimation]);

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 600);
  };

  // Different bounce animations for each card
  const bounceAnimations = ['animate-bounce-gentle', 'animate-wiggle', 'animate-pulse-bounce', 'animate-bounce-rotate'];
  const bounceClass = bounceAnimations[index % bounceAnimations.length];

  // Different entrance animations
  const entranceAnims = ['animate-elastic', 'animate-pop-in', 'animate-slide-up-bounce', 'animate-spin-bounce'];
  const entranceClass = entranceAnims[index % entranceAnims.length];

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          card card-hover text-center cursor-pointer select-none
          transition-all duration-300 relative overflow-hidden
          ${isVisible ? entranceClass : ''}
          ${isBouncing ? bounceClass : ''}
          ${isHovered ? 'scale-110 shadow-2xl' : ''}
        `}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Animated background gradient on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-[#F5A623]/10 via-transparent to-[#1B2A47]/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Floating icon with gentle animation */}
        <div 
          className={`text-4xl sm:text-5xl mb-3 relative z-10 transition-transform duration-300 ${isVisible ? 'animate-float-gentle' : ''} ${isHovered ? 'scale-125' : ''}`} 
          style={{ animationDelay: `${delay + 200}ms` }}
        >
          {icon}
        </div>
        
        {/* Counter with sparkle effect */}
        <div className="relative inline-block z-10">
          <div className="font-baloo font-bold text-3xl sm:text-4xl md:text-5xl text-teal-gradient mb-2">
            {count}{suffix}
          </div>
          {/* Sparkle decorations */}
          <span className={`absolute -top-2 -right-4 text-lg transition-all duration-300 ${isHovered ? 'scale-150' : ''}`}>
            <span className="animate-twinkle">✨</span>
          </span>
          <span className={`absolute -bottom-1 -left-3 text-sm transition-all duration-300 ${isHovered ? 'scale-150' : ''}`}>
            <span className="animate-twinkle-delayed">⭐</span>
          </span>
        </div>
        
        <div className="text-primary font-medium text-sm sm:text-base relative z-10">{t(label, labelAr)}</div>
        
        {/* Click hint with star */}
        <div className={`mt-2 text-[10px] text-muted/60 transition-all duration-300 relative z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {t('Click for stars! ⭐', 'انقر لرؤية النجوم! ⭐')}
        </div>
      </div>
    </div>
  );
}

const stats = [
  { icon: '👶', value: 500, suffix: '+', label: 'Happy Children', labelAr: 'أطفال سعداء' },
  { icon: '👩‍🏫', value: 25, suffix: '+', label: 'Expert Teachers', labelAr: 'معلمة متخصصة' },
  { icon: '⭐', value: 25, suffix: '+', label: 'Years of Excellence', labelAr: 'سنة من التميز' },
  { icon: '❤️', value: 98, suffix: '%', label: 'Parent Satisfaction', labelAr: 'رضا أولياء الأمور' },
];

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.3 });
  const clickStarsRef = useClickStars();
  const { ref: titleRef, className: titleClassName, style: titleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 0 });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 section-warm-white overflow-hidden"
    >
      {/* Floating decorative stars */}
      <div className="absolute top-10 left-[10%] text-3xl animate-float-slow opacity-30 pointer-events-none">⭐</div>
      <div className="absolute top-20 right-[15%] text-2xl animate-float-delayed opacity-25 pointer-events-none">✨</div>
      <div className="absolute bottom-10 left-[20%] text-xl animate-twinkle opacity-30 pointer-events-none">🌟</div>
      <div className="absolute top-1/2 right-[5%] text-lg animate-bounce-gentle opacity-20 pointer-events-none">💫</div>
      <div className="absolute bottom-20 right-[25%] text-2xl animate-float-gentle opacity-20 pointer-events-none">⭐</div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B2A47]/10 to-transparent" />
      
      <div ref={clickStarsRef} className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section title with enhanced animation */}
        <div 
          ref={titleRef}
          className={`text-center mb-10 ${titleClassName}`}
          style={titleStyle}
        >
          <span className="section-tag inline-flex items-center gap-2">
            <span className="animate-bounce-inline">🏆</span>
            {t('Our Achievements', 'إنجازاتنا')}
          </span>
          <h2 className="font-baloo font-bold text-2xl sm:text-3xl text-primary mt-4">
            {t('Numbers That Shine!', 'أرقام تلمع!')} <span className="animate-bounce-inline">⭐</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={index * 200}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
