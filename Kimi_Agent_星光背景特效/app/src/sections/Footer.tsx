import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';

const quickLinks = [
  { label: 'About Us', labelAr: 'من نحن', href: '#about' },
  { label: 'Programs', labelAr: 'برامجنا', href: '#programs' },
  { label: 'Activities', labelAr: 'الأنشطة', href: '#activities' },
  { label: 'Why Us', labelAr: 'لماذا نحن', href: '#why-us' },
  { label: 'Contact Us', labelAr: 'اتصل بنا', href: '#contact' },
];

const contactLinks = [
  { label: '60699331', href: 'tel:+96560699331' },
  { label: 'WhatsApp', labelAr: 'واتساب', href: 'https://wa.me/96560699331?text=Hello, I\'d like to enroll my child at Little Stars Nursery 🌟' },
  { label: 'Instagram', labelAr: 'إنستغرام', href: 'https://instagram.com/lsn.nursery_' },
  { label: 'Snapchat', labelAr: 'سناب شات', href: 'https://snapchat.com/add/lsn.nursery' },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const { t, language } = useLanguage();

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={ref}
      className={`relative py-12 sm:py-16 bg-[#1B2A47] transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className={`grid md:grid-cols-3 gap-8 lg:gap-12 mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {/* Logo & Description */}
          <div>
            <a 
              href="#" 
              className={`flex items-center gap-2 mb-4 group ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img src="/logo.png" alt="Little Stars Nursery logo" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-baloo font-bold text-white text-lg">
                  {t('Little Stars', 'النجوم الصغيرة')}
                </span>
              </div>
            </a>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {t(
                "Kuwait's beloved play-based preschool, nurturing little stars since 1999 with love, care, and excellence.",
                "روضة الأطفال المحبوبة في الكويت، نرعى النجوم الصغيرة منذ عام 1999 بالحب والرعاية والتميز."
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className={language === 'ar' ? 'md:pr-12' : 'md:pl-12'}>
            <h4 className="font-baloo font-bold text-white text-lg mb-4">
              {t('Quick Links', 'روابط سريعة')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-[#F5A623] text-sm transition-colors"
                  >
                    {t(link.label, link.labelAr)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-baloo font-bold text-white text-lg mb-4">
              {t('Contact Us', 'اتصل بنا')}
            </h4>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-white/70 hover:text-[#F5A623] text-sm transition-colors"
                  >
                    {link.labelAr && language === 'ar' ? link.labelAr : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
            <p className="text-white/40 text-sm text-center sm:text-left">
              {t('© 2026 Little Stars Nursery · Kuwait 🇰🇼', '© 2026 حضانة النجوم الصغيرة · الكويت 🇰🇼')}
            </p>
            <p className="text-white/30 text-xs">
              {t('All Rights Reserved', 'جميع الحقوق محفوظة')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
