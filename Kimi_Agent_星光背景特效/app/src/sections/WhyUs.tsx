import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import WaveSeparator from '../components/WaveSeparator';
import { Home, GraduationCap, MessageSquare, Calendar } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Safe, Homely Environment',
    titleAr: 'بيئة آمنة ومنزلية',
    description: 'Our nursery is designed to feel like a second home, with secure facilities and a warm, welcoming atmosphere.',
    descriptionAr: 'تم تصميم حضانتنا لتشعر وكأنها بيت ثانٍ، مع مرافق آمنة وأجواء دافئة ومرحبة.',
    anim: 'slideLeft' as const,
  },
  {
    icon: GraduationCap,
    title: 'Certified, Caring Teachers',
    titleAr: 'معلمون معتمدون ومهتمون',
    description: 'Our educators are professionally trained and passionate about early childhood development.',
    descriptionAr: 'معلمونا مدربون مهنيا ومتحمسون لتنمية الطفولة المبكرة.',
    anim: 'slideRight' as const,
  },
  {
    icon: MessageSquare,
    title: 'Daily Parent Communication',
    titleAr: 'تواصل يومي مع الأهل',
    description: 'Stay connected with your child\'s progress through daily updates via WhatsApp.',
    descriptionAr: 'ابقَ على تواصل مع تقدم طفلك من خلال تحديثات يومية عبر الواتساب.',
    anim: 'slideLeft' as const,
  },
  {
    icon: Calendar,
    title: 'Rich Weekly Activity Calendar',
    titleAr: 'تقويم أسبوعي غني بالأنشطة',
    description: 'From arts and crafts to outdoor play, every week brings new exciting experiences.',
    descriptionAr: 'من الفنون والحرف إلى اللعب الخارجي، كل أسبوع يجلب تجارب جديدة ومثيرة.',
    anim: 'slideRight' as const,
  },
];

const miniStats = [
  { icon: '🕐', label: 'Open 7am–2pm', labelAr: 'مفتوح 7ص–2م' },
  { icon: '🎮', label: 'Play-Based', labelAr: 'قائم على اللعب' },
  { icon: '🗣️', label: 'Bilingual', labelAr: 'ثنائي اللغة' },
  { icon: '🎁', label: 'Special Offers', labelAr: 'عروض خاصة' },
];

interface FeatureItemProps {
  feature: typeof features[0];
  index: number;
  language: string;
  t: (en: string, ar: string) => string;
}

function FeatureItem({ feature, index, language, t }: FeatureItemProps) {
  const Icon = feature.icon;
  const { ref: featureRef, className: featureClassName, style: featureStyle } = usePlayfulScroll<HTMLDivElement>({ animation: feature.anim, delay: index * 150 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={featureRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex gap-4 sm:gap-6 cursor-pointer transition-all duration-300 ${featureClassName} ${isHovered ? (language === 'ar' ? '-translate-x-2' : 'translate-x-2') : ''} ${language === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}
      style={featureStyle}
    >
      {/* Icon Box */}
      <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#F5A623]/20 to-[#F5A623]/10 flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 from-[#F5A623]/40' : ''}`}>
        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 text-[#1B2A47] transition-transform duration-300 ${isHovered ? 'scale-125' : ''}`} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-baloo font-bold text-lg sm:text-xl text-primary mb-1">{t(feature.title, feature.titleAr)}</h3>
        <p className="text-secondary text-sm sm:text-base leading-relaxed">{t(feature.description, feature.descriptionAr)}</p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });
  const { ref: titleRef, className: titleClassName, style: titleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 0 });
  const { t, language } = useLanguage();

  return (
    <section id="why-us" ref={sectionRef} className="relative py-16 sm:py-24 section-sage overflow-hidden">
      <WaveSeparator color="#E8F0E8" flip className="top-0" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-[#F5A623]/10" />
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-[#1B2A47]/5" />
      <div className="absolute top-10 left-[10%] text-2xl animate-float-slow opacity-20 pointer-events-none">⭐</div>
      <div className="absolute bottom-10 right-[15%] text-xl animate-float-delayed opacity-15 pointer-events-none">✨</div>
      <div className="absolute top-1/3 left-[5%] text-lg animate-twinkle opacity-20 pointer-events-none">🌟</div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleClassName}`} style={titleStyle}>
          <span className="section-tag inline-flex items-center gap-2">
            <span className="animate-bounce-inline">⭐</span>
            {t('Why Choose Us', 'لماذا نحن')}
          </span>
          <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3 mt-4">
            {t('Why Little Stars?', 'لماذا النجوم الصغيرة؟')}
            <span className="inline-block animate-bounce-gentle ml-2">💫</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Features List - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            {features.map((feature, index) => (
              <FeatureItem 
                key={feature.title} 
                feature={feature} 
                index={index} 
                language={language} 
                t={t} 
              />
            ))}
          </div>

          {/* Side Panel - Right Side */}
          <div className="lg:col-span-2">
            <div className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
              {/* Big Teal Card with Shimmer */}
              <div className={`relative bg-gradient-to-br from-[#1B2A47] to-[#273A5E] p-6 sm:p-8 rounded-3xl overflow-hidden ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="absolute inset-0 shimmer opacity-30" />
                <div className="relative z-10">
                  <div className={`text-5xl sm:text-6xl mb-4 animate-float-gentle ${language === 'ar' ? 'flex justify-end' : ''}`}>⭐</div>
                  <div className="font-baloo font-bold text-4xl sm:text-5xl text-[#F5A623] mb-2">25+</div>
                  <div className="text-white font-bold text-lg sm:text-xl mb-3">{t('Years of Nurturing', 'سنة من رعاية النجوم الصغيرة')}</div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t(
                      "For over two decades, we've been shaping the future of Kuwait's children with love, care, and excellence.",
                      "لأكثر من عقدين من الزمن، كنا نشكل مستقبل أطفال الكويت بالحب والرعاية والتميز."
                    )}
                  </p>
                </div>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {miniStats.map((stat, index) => (
                  <div key={stat.label} className={`card text-center transition-all duration-500 hover:scale-105 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0 animate-pop-in' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${600 + index * 100}ms`, animationDelay: `${600 + index * 100}ms` }}>
                    <div className="text-2xl mb-1 animate-bounce-gentle" style={{ animationDelay: `${index * 200}ms` }}>{stat.icon}</div>
                    <div className="text-primary text-xs font-medium">{t(stat.label, stat.labelAr)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveSeparator color="#E8F0E8" className="bottom-0" />
    </section>
  );
}
