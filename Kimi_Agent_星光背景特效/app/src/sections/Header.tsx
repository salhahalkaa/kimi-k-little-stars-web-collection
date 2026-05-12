import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { label: 'About', labelAr: 'من نحن', href: '#about' },
  { label: 'Programs', labelAr: 'برامجنا', href: '#programs' },
  { label: 'Activities', labelAr: 'الأنشطة', href: '#activities' },
  { label: 'Why Us', labelAr: 'لماذا نحن', href: '#why-us' },
  { label: 'Contact', labelAr: 'اتصل بنا', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass py-3 shadow-sm'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img src="/logo.png" alt="Little Stars Nursery logo" className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-baloo font-bold text-primary text-sm sm:text-base leading-tight group-hover:text-[#1B2A47] transition-colors">
                  {t('Little Stars', 'النجوم الصغيرة')}
                </span>
                <span className="font-cairo font-medium text-muted text-[10px] sm:text-xs leading-tight">
                  {t('Little Stars Nursery', 'حضانة النجوم الصغيرة')}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-secondary hover:text-[#1B2A47] text-sm font-medium transition-colors relative group"
                >
                  {t(link.label, link.labelAr)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5A623] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium"
              >
                <Languages size={16} />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* CTA Button - Desktop */}
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-gold text-sm"
              >
                {t('Enroll Now', 'سجل الآن')}
              </button>
            </div>

            {/* Mobile Menu Button & Language Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 text-primary"
                aria-label="Switch language"
              >
                <span className="text-sm font-bold">{language === 'en' ? 'ع' : 'En'}</span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="touch-target flex items-center justify-center text-primary"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-white/95 backdrop-blur-lg transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-0 h-full w-72 bg-white border-${language === 'ar' ? 'r' : 'l'} border-gray-100 p-6 pt-20 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : (language === 'ar' ? '-translate-x-full' : 'translate-x-full')
          }`}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-${language === 'ar' ? 'right' : 'left'} text-primary hover:text-[#1B2A47] text-lg font-medium py-3 border-b border-gray-100 transition-all`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {t(link.label, link.labelAr)}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-gold w-full mt-8 text-center"
          >
            {t('Enroll Now', 'سجل الآن')}
          </button>
        </div>
      </div>
    </>
  );
}
