import { Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
  {
    icon: Instagram,
    emoji: '📸',
    label: 'Instagram',
    href: 'https://instagram.com/lsn.nursery_',
  },
  {
    icon: () => <span className="text-lg">👻</span>,
    emoji: '👻',
    label: 'Snapchat',
    href: 'https://snapchat.com/add/lsn.nursery',
  },
  {
    icon: MessageCircle,
    emoji: '💬',
    label: 'WhatsApp',
    href: 'https://wa.me/96560699331?text=Hello, I\'d like to enroll my child at Little Stars Nursery 🌟',
  },
];

export default function SocialBar() {
  const { t, language } = useLanguage();
  return (
    <section className="relative py-8 section-sage">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B2A47]/10 to-transparent" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
          <span className="text-secondary font-medium text-sm sm:text-base">
            {t('Follow Us', 'تابعنا')}
          </span>
          
          <div className={`flex gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {socialLinks.map((social) => {
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all group ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.emoji}
                  </span>
                  <span className="text-primary text-sm font-medium hidden sm:inline">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
