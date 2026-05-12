import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useClickStars } from '../hooks/useClickStars';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import type { AnimationType } from '../hooks/usePlayfulScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import WaveSeparator from '../components/WaveSeparator';

const programs = [
  {
    icon: '🍼',
    title: 'Infant Care',
    titleAr: 'رعاية الرضع',
    age: 'Ages 1–12 months',
    ageAr: 'من شهر إلى 12 شهر',
    accent: 'teal',
    features: [
      { en: 'Dedicated caregiver', ar: 'مقدم رعاية مخصص' },
      { en: 'Sensory activities', ar: 'أنشطة حسية' },
      { en: 'Daily updates', ar: 'تحديثات يومية' },
      { en: 'Cozy setting', ar: 'بيئة مريحة' },
    ],
  },
  {
    icon: '🌱',
    title: 'Toddler Discovery',
    titleAr: 'اكتشاف الصغار',
    age: 'Ages 1–3 years',
    ageAr: 'من سنة إلى 3 سنوات',
    accent: 'gold',
    features: [
      { en: 'Play-based curriculum', ar: 'منهج قائم على اللعب' },
      { en: 'Bilingual exposure', ar: 'تعرض ثنائي اللغة' },
      { en: 'Art + Music + Movement', ar: 'فن + موسيقى + حركة' },
      { en: 'Social-emotional learning', ar: 'التعلم الاجتماعي العاطفي' },
    ],
  },
  {
    icon: '🎓',
    title: 'Pre-KG Stars',
    titleAr: 'نجوم ما قبل الروضة',
    age: 'Ages 3–5 years',
    ageAr: 'من 3 إلى 5 سنوات',
    accent: 'coral',
    features: [
      { en: 'Literacy & phonics', ar: 'محو الأمية والصوتيات' },
      { en: 'Math & science', ar: 'الرياضيات والعلوم' },
      { en: 'Field trips', ar: 'رحلات ميدانية' },
      { en: 'Graduation ceremony', ar: 'حفل التخرج' },
    ],
  },
];

const accentColors: Record<string, { bg: string; border: string; iconBg: string }> = {
  teal: { 
    bg: 'hover:shadow-[#1B2A47]/20', 
    border: 'border-[#1B2A47]/20',
    iconBg: 'from-[#1B2A47] to-[#273A5E]'
  },
  gold: { 
    bg: 'hover:shadow-[#F5A623]/30', 
    border: 'border-[#F5A623]/30',
    iconBg: 'from-[#F5A623] to-[#F7B74D]'
  },
  coral: { 
    bg: 'hover:shadow-[#FF8B7B]/20', 
    border: 'border-[#FF8B7B]/20',
    iconBg: 'from-[#FF8B7B] to-[#FFB5AA]'
  },
};

interface ProgramCardProps {
  program: typeof programs[0];
  index: number;
  isVisible: boolean;
}

function ProgramCard({ program, index, isVisible }: ProgramCardProps) {
  const colors = accentColors[program.accent];
  const [isWiggling, setIsWiggling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t, language } = useLanguage();

  const handleClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  };

  // Different entrance animations
  const entranceAnims = ['animate-elastic', 'animate-pop-in', 'animate-slide-up-bounce'];
  const entranceClass = entranceAnims[index % entranceAnims.length];

  // Different scroll animations
  const scrollAnims = ['bounceIn', 'elasticIn', 'flipIn'];
  const { ref: scrollRef, className: scrollClassName, style: scrollStyle } = usePlayfulScroll<HTMLDivElement>({ 
    animation: scrollAnims[index % scrollAnims.length] as AnimationType, 
    delay: index * 200 
  });

  return (
    <div
      ref={scrollRef}
      className={`${scrollClassName}`}
      style={scrollStyle}
    >
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          card card-lift h-full border-t-4 ${colors.border} ${colors.bg}
          cursor-pointer select-none relative overflow-hidden
          ${isVisible ? entranceClass : ''}
          ${isWiggling ? 'animate-wiggle' : ''}
          ${isHovered ? 'scale-105 shadow-2xl' : ''}
          ${language === 'ar' ? 'text-right' : 'text-left'}
        `}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        {/* Animated gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[${program.accent === 'teal' ? '#1B2A47' : program.accent === 'gold' ? '#F5A623' : '#FF8B7B'}]/5 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Floating Icon */}
        <div
          className={`
            w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${colors.iconBg} 
            flex items-center justify-center text-3xl sm:text-4xl mb-6 shadow-lg
            animate-float-gentle transition-transform duration-300
            ${isHovered ? 'scale-110 rotate-6' : ''}
            ${language === 'ar' ? 'mr-0' : ''}
          `}
          style={{ 
            animationDelay: `${index * 200}ms`,
            marginRight: language === 'ar' ? '0' : 'auto',
            marginLeft: language === 'ar' ? 'auto' : '0'
          }}
        >
          {program.icon}
        </div>

        {/* Sparkle decorations */}
        <span className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} text-lg transition-all duration-300 ${isHovered ? 'opacity-100 scale-150' : 'opacity-50'}`}>
          <span className="animate-twinkle">✨</span>
        </span>

        {/* Title */}
        <h3 className="font-baloo font-bold text-xl sm:text-2xl text-primary mb-2 relative z-10">
          {t(program.title, program.titleAr)}
        </h3>

        {/* Age Badge */}
        <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${colors.iconBg} text-white text-xs font-bold mb-6 relative z-10`}>
          {t(program.age, program.ageAr)}
        </div>

        {/* Features with stagger */}
        <ul className="space-y-3 relative z-10">
          {program.features.map((feature, i) => (
            <li 
              key={i} 
              className={`flex items-start gap-3 transition-all duration-500 ${language === 'ar' ? 'flex-row-reverse' : ''} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${colors.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                <span className="text-secondary text-sm">{t(feature.en, feature.ar)}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Register Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`mt-6 w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 relative z-10
            ${program.accent === 'teal' ? 'bg-[#1B2A47] text-white' : program.accent === 'gold' ? 'bg-[#F5A623] text-primary' : 'bg-[#FF8B7B] text-white'}
            hover:scale-105 hover:shadow-lg active:scale-95
          `}
        >
          {t('Register Now', 'سجل الآن')}
        </button>
        
        {/* Click hint */}
        <div className={`mt-4 text-[10px] text-muted/60 transition-all duration-300 text-center relative z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {t('Click for stars! ⭐', 'انقر لرؤية النجوم! ⭐')}
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const clickStarsRef = useClickStars();
  const { ref: titleRef, className: titleClassName, style: titleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 0 });
  const { t } = useLanguage();

  return (
    <section id="programs" ref={ref} className="relative py-16 sm:py-24 section-warm-white overflow-hidden">
      {/* Wave separator */}
      <WaveSeparator color="#FAF8F5" flip className="top-0" />

      {/* Floating stars */}
      <div className="absolute top-10 left-[8%] text-2xl animate-float-slow opacity-20 pointer-events-none">⭐</div>
      <div className="absolute top-1/3 right-[10%] text-xl animate-float-delayed opacity-15 pointer-events-none">✨</div>
      <div className="absolute bottom-20 left-[5%] text-lg animate-twinkle opacity-20 pointer-events-none">🌟</div>
      <div className="absolute top-1/2 right-[3%] text-2xl animate-bounce-gentle opacity-20 pointer-events-none">💫</div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B2A47]/10 to-transparent" />
      
      <div ref={clickStarsRef} className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 ${titleClassName}`}
          style={titleStyle}
        >
          <span className="section-tag inline-flex items-center gap-2">
            <span className="animate-bounce-inline">📚</span>
            {t('Our Programs', 'برامجنا')}
          </span>
          <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3 mt-4">
            {t('Top-rated Preschool in Kuwait & Childcare Services', 'أفضل خدمات رعاية الأطفال والتعليم المبكر في الكويت')}
            <span className="inline-block animate-bounce-gentle ml-2">🌈</span>
          </h2>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-1000">
          {programs.map((program, index) => (
            <ProgramCard
              key={program.title}
              program={program}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Wave separator at bottom */}
      <WaveSeparator color="#FAF8F5" className="bottom-0" />
    </section>
  );
}
