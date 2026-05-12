import { useState } from 'react';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import WaveSeparator from '../components/WaveSeparator';
import { useClickStars } from '../hooks/useClickStars';
import { useLanguage } from '../context/LanguageContext';
import { Phone } from 'lucide-react';

export default function EnrollmentCTA() {
  const { ref: contentRef, className: contentClassName, style: contentStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'elasticIn', delay: 0 });
  const clickStarsRef = useClickStars();
  const [isHoveredWhatsApp, setIsHoveredWhatsApp] = useState(false);
  const [isHoveredCall, setIsHoveredCall] = useState(false);
  const { t, language } = useLanguage();

  return (
    <section id="enroll" className="relative py-16 sm:py-24 section-cream overflow-hidden">
      <WaveSeparator color="#FAF8F5" flip className="top-0" />

      {/* Floating stars and decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#F5A623]/10 animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#1B2A47]/5 animate-float-delayed" />
      <div className="absolute top-20 left-[15%] text-3xl animate-float-gentle opacity-30 pointer-events-none">⭐</div>
      <div className="absolute top-1/3 right-[10%] text-2xl animate-twinkle opacity-25 pointer-events-none">✨</div>
      <div className="absolute bottom-20 left-[8%] text-xl animate-bounce-gentle opacity-20 pointer-events-none">🌟</div>
      <div className="absolute top-1/2 right-[5%] text-2xl animate-float-slow opacity-20 pointer-events-none">💫</div>
      
      <div ref={clickStarsRef} className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          ref={contentRef}
          className={`relative max-w-4xl mx-auto ${contentClassName}`}
          style={contentStyle}
        >
          {/* Main Card with Breathing Animation */}
          <div className="relative rounded-3xl overflow-hidden animate-breathe">
            {/* Background with Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A47] via-[#0F182B] to-[#1B2A47]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,200,66,0.2)_0%,_transparent_70%)]" />

            {/* Floating sparkles */}
            <span className="absolute top-6 left-6 text-2xl animate-twinkle">✨</span>
            <span className="absolute top-10 right-10 text-xl animate-twinkle-delayed">⭐</span>
            <span className="absolute bottom-8 left-12 text-lg animate-float-gentle">💫</span>
            <span className="absolute bottom-12 right-8 text-xl animate-bounce-gentle">🌟</span>

            {/* Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
              {/* Sparkle Icon with bounce */}
              <div className="text-5xl sm:text-6xl mb-6 animate-bounce-gentle">✨</div>

              {/* Headline */}
              <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                {t('Give Your Child the Best Start', 'امنح طفلك أفضل بداية')}
              </h2>

              {/* Description */}
              <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10">
                {t(
                  "Enrollment for 2025–2026 is now open! Secure your child's spot today and take advantage of our early bird offers.",
                  "التسجيل للعام 2025–2026 مفتوح الآن! احجز مكان طفلك اليوم واستفد من عروضنا المبكرة."
                )}
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
                {/* WhatsApp Button */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  onMouseEnter={() => setIsHoveredWhatsApp(true)}
                  onMouseLeave={() => setIsHoveredWhatsApp(false)}
                  className={`btn-gold text-base sm:text-lg px-8 py-4 w-full sm:w-auto relative overflow-hidden group transition-all duration-300 ${isHoveredWhatsApp ? 'scale-110 shadow-2xl' : ''}`}
                >
                  <span className="relative z-10">{t('Register Now', 'سجل الآن')}</span>
                </a>

                {/* Call Button */}
                <a
                  href="tel:+96560699331"
                  onMouseEnter={() => setIsHoveredCall(true)}
                  onMouseLeave={() => setIsHoveredCall(false)}
                  className={`flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full border-2 border-white/30 text-white font-semibold transition-all duration-300 ${isHoveredCall ? 'bg-white/10 scale-110' : ''}`}
                >
                  <Phone className={`w-5 h-5 transition-transform duration-300 ${isHoveredCall ? 'scale-125 rotate-12' : ''}`} />
                  <span>60699331</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveSeparator color="#FAF8F5" className="bottom-0" />
    </section>
  );
}
