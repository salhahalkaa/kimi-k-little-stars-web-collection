import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useClickStars } from '../hooks/useClickStars';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import type { AnimationType } from '../hooks/usePlayfulScrollAnimation';
import WaveSeparator from '../components/WaveSeparator';
import { useLanguage } from '../context/LanguageContext';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Fatima Al-Rashid',
    role: 'Mother of 2 children',
    roleAr: 'أم لطفلين',
    quote: 'Little Stars has been a blessing for our family. My children have grown so much in confidence and knowledge. The teachers truly care about each child.',
    quoteAr: 'كانت النجوم الصغيرة نعمة لعائلتنا. أطفالي نما كثيراً في الثقة والمعرفة. المعلمون يهتمون حقاً بكل طفل.',
    rating: 5,
    language: 'mixed' as const,
  },
  {
    name: 'Ahmad Al-Sabah',
    role: 'Father of 1 child',
    roleAr: 'أب لطفل واحد',
    quote: 'أفضل حضانة في الكويت! ابني يستمتع كل يوم ويتعلم الكثير. التواصل اليومي مع الأهل ممتاز.',
    quoteAr: 'Best nursery in Kuwait! My son enjoys every day and learns so much. The daily parent communication is excellent.',
    rating: 5,
    language: 'arabic' as const,
  },
  {
    name: 'Sarah Johnson',
    role: 'Mother of 1 child',
    roleAr: 'أم لطفل واحد',
    quote: 'As an expat family, we wanted a nursery that respects our values while providing quality education. Little Stars exceeded our expectations!',
    quoteAr: 'كعائلة مقيمة، أردنا حضانة تحترم قيمنا مع توفير تعليم عالي الجودة. النجوم الصغيرة فاقت توقعاتنا!',
    rating: 5,
    language: 'english' as const,
  },
];

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const anims: AnimationType[] = ['bounceIn', 'elasticIn', 'rotateIn'];
  const { ref: cardRef, className: cardClassName, style: cardStyle } = usePlayfulScroll<HTMLDivElement>({ animation: anims[index % anims.length], delay: index * 250 });
  const { t, language } = useLanguage();

  return (
    <div ref={cardRef} className={cardClassName} style={cardStyle}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`card h-full transition-all duration-300 cursor-pointer ${isHovered ? 'scale-105 shadow-xl' : ''} ${language === 'ar' ? 'text-right' : 'text-left'}`}
      >
        {/* Stars */}
        <div className={`flex gap-1 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className={`w-5 h-5 fill-[#F5A623] text-[#F5A623] transition-all duration-300 ${isHovered ? 'scale-125' : ''}`} style={{ transitionDelay: `${i * 50}ms` }} />
          ))}
        </div>

        {/* Quote */}
        <div className="mb-6">
          <p className={`${language === 'ar' ? 'font-cairo' : ''} text-secondary text-base sm:text-lg leading-relaxed italic`}>
            &ldquo;{t(testimonial.quote, testimonial.quoteAr)}&rdquo;
          </p>
        </div>

        {/* Author */}
        <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#F5A623] to-[#F7B74D] flex items-center justify-center text-primary font-bold text-lg transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="text-primary font-medium">{testimonial.name}</div>
            <div className="text-muted text-sm">{t(testimonial.role, testimonial.roleAr)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref: sectionRef } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const clickStarsRef = useClickStars();
  const { ref: titleRef, className: titleClassName, style: titleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 0 });
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 section-warm-white overflow-hidden">
      <WaveSeparator color="#FAF8F5" flip className="top-0" />

      {/* Floating stars */}
      <div className="absolute top-10 left-[8%] text-2xl animate-float-slow opacity-20 pointer-events-none">⭐</div>
      <div className="absolute top-1/4 right-[12%] text-xl animate-float-delayed opacity-15 pointer-events-none">✨</div>
      <div className="absolute bottom-20 left-[15%] text-lg animate-twinkle opacity-20 pointer-events-none">🌟</div>
      
      <div ref={clickStarsRef} className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleClassName}`} style={titleStyle}>
          <span className="section-tag inline-flex items-center gap-2">
            <span className="animate-bounce-inline">💬</span>
            {t('Testimonials', 'آراء الأهل')}
          </span>
          <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3 mt-4">
            {t('What Parents Say', 'ماذا يقول الأهل عنا')}
            <span className="inline-block animate-bounce-gentle ml-2">❤️</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      <WaveSeparator color="#FAF8F5" className="bottom-0" />
    </section>
  );
}
