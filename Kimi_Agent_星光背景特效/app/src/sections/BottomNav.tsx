import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, ClipboardList, Image, MessageCircle, Phone } from 'lucide-react';

const navItems = [
  { icon: Home, emoji: '🏠', label: 'Home', labelAr: 'الرئيسية', href: '#' },
  { icon: ClipboardList, emoji: '📋', label: 'Programs', labelAr: 'البرامج', href: '#programs' },
  { icon: Image, emoji: '🎨', label: 'Gallery', labelAr: 'معرض الصور', href: '#activities' },
  { icon: MessageCircle, emoji: '💬', label: 'WhatsApp', labelAr: 'واتساب', href: 'https://wa.me/96560699331?text=Hello, I\'d like to enroll my child at Little Stars Nursery 🌟', isExternal: true },
  { icon: Phone, emoji: '📞', label: 'Call', labelAr: 'اتصل', href: 'tel:+96560699331' },
];

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Only show on mobile
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Track active section
    const handleScroll = () => {
      const sections = ['programs', 'activities', 'why-us', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (item: typeof navItems[0]) => {
    if (item.isExternal || item.href.startsWith('tel:') || item.href.startsWith('https:')) {
      return;
    }

    if (item.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 pb-safe shadow-lg">
        <div className={`flex items-center justify-around py-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {navItems.map((item) => {
            const isActive = item.href === '#' 
              ? activeSection === '' 
              : activeSection === item.href.replace('#', '');

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!item.isExternal && !item.href.startsWith('tel:') && !item.href.startsWith('https:')) {
                    e.preventDefault();
                    handleClick(item);
                  }
                }}
                className={`bottom-nav-item touch-target px-3 py-2 ${
                  isActive ? 'active' : ''
                }`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-[10px] font-medium">{t(item.label, item.labelAr)}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
