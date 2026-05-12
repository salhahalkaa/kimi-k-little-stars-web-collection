import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, Phone, MessageSquare, Instagram, Ghost } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Al Siddeeq, Block 7, Street 712, Building 301, Kuwait',
    labelAr: 'الصديق، قطعة 7، شارع 712، مبنى 301، الكويت',
    href: 'https://maps.app.goo.gl/PUaXQZNSMKzApNsE8',
    isExternal: true,
  },
  {
    icon: Phone,
    label: '60699331',
    labelAr: 'اتصل بنا',
    href: 'tel:+96560699331',
    isExternal: false,
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp +965 6069 9331',
    labelAr: 'واتساب',
    href: 'https://wa.me/96560699331?text=Hello, I\'d like to enroll my child at Little Stars Nursery 🌟',
    isExternal: true,
  },
  {
    icon: Instagram,
    label: '@lsn.nursery_',
    labelAr: 'انستغرام',
    href: 'https://instagram.com/lsn.nursery_',
    isExternal: true,
  },
  {
    icon: Ghost,
    label: 'lsn.nursery',
    labelAr: 'سناب شات',
    href: 'https://snapchat.com/add/lsn.nursery',
    isExternal: true,
  },
];

export default function Location() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-16 sm:py-24 section-warm-white"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B2A47]/10 to-transparent" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            titleVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">
            Location — الموقع
          </span>
          <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3">
            Visit Us
          </h2>
          <p className="font-cairo text-muted text-lg">
            زورونا
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info - Left Side */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-4 p-4 rounded-2xl card card-hover transition-all duration-500 group ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-12'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5A623]/20 to-[#F5A623]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#1B2A47]/20 group-hover:to-[#1B2A47]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#1B2A47]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-primary font-medium text-sm sm:text-base truncate">
                      {item.label}
                    </div>
                    <div className="font-cairo text-muted text-xs">
                      {item.labelAr}
                    </div>
                  </div>
                  <div className="text-muted group-hover:text-[#1B2A47] transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Map Card - Right Side */}
          <div
            className={`perspective-1000 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            style={{
              transitionDelay: '300ms',
            }}
          >
            <div
              className={`preserve-3d transition-transform duration-1000`}
              style={{
                transform: isVisible
                  ? 'rotateY(0deg)'
                  : 'rotateY(90deg)',
                transformOrigin: 'center',
              }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1B2A47]/10 to-[#273A5E]/5 p-1">
                {/* Grid Background */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(13, 92, 115, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(13, 92, 115, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />

                <div className="relative bg-white/80 backdrop-blur-sm rounded-[22px] overflow-hidden min-h-[300px] sm:min-h-[400px] h-full flex flex-col items-center justify-center">
                  <iframe 
                    src="https://maps.google.com/maps?q=Little%20Stars%20Nursery,%20Al%20Siddeeq,%20Kuwait&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Little Stars Nursery Location"
                    className="absolute inset-0 w-full h-full"
                  />
                  {/* Floating button to open native map app */}
                  <a
                    href="https://maps.app.goo.gl/PUaXQZNSMKzApNsE8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 btn-gold flex items-center gap-2 py-2 px-6 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform whitespace-nowrap"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
