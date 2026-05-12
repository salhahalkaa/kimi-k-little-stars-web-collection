import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { usePlayfulScroll } from '../hooks/usePlayfulScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { User, Phone, Baby, Calendar, MessageSquare, Send } from 'lucide-react';
import FloatingLabelInput from '../components/FloatingLabelInput';

export default function Contact() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const { ref: titleRef, className: titleClassName, style: titleStyle } = usePlayfulScroll<HTMLDivElement>({ animation: 'slideUp', delay: 0 });
  const { t, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childName: '',
    childAge: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message with professional bold formatting
    const text = `*New Website Inquiry* 🌟\n\n` +
                 `*Parent Name:* ${formData.parentName}\n` +
                 `*Phone Number:* ${formData.phone}\n` +
                 `*Child's Name:* ${formData.childName}\n` +
                 `*Child's Age:* ${formData.childAge}\n` +
                 `*Message:* ${formData.message}\n\n` +
                 `_Sent via Little Stars Nursery Website_`;
    
    const whatsappUrl = `https://wa.me/96560699331?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 sm:py-24 section-warm-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[5%] text-4xl animate-float-slow opacity-10 pointer-events-none">📝</div>
      <div className="absolute bottom-40 left-[2%] text-3xl animate-float-delayed opacity-10 pointer-events-none">✨</div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className={`text-center mb-12 sm:mb-16 ${titleClassName}`} style={titleStyle}>
          <span className="section-tag inline-flex items-center gap-2">
            <span className="animate-bounce-inline">👋</span>
            {t('Contact Us', 'اتصل بنا')}
          </span>
          <h2 className="font-baloo font-bold text-2xl sm:text-3xl md:text-4xl text-primary mb-3 mt-4">
            {t("Start Your Child's Journey", 'ابدأ رحلة طفلك معنا')}
          </h2>
        </div>

        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <form 
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(27,42,71,0.1)] border border-white/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
              <FloatingLabelInput
                required
                name="parentName"
                label="Parent Name"
                labelAr="اسم ولي الأمر"
                value={formData.parentName}
                onChange={handleChange}
                icon={<User size={18} />}
              />

              <FloatingLabelInput
                required
                type="tel"
                name="phone"
                label="Phone Number"
                labelAr="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                icon={<Phone size={18} />}
              />

              <FloatingLabelInput
                required
                name="childName"
                label="Child's Name"
                labelAr="اسم الطفل"
                value={formData.childName}
                onChange={handleChange}
                icon={<Baby size={18} />}
              />

              <FloatingLabelInput
                required
                name="childAge"
                label="Child's Age"
                labelAr="عمر الطفل"
                value={formData.childAge}
                onChange={handleChange}
                icon={<Calendar size={18} />}
              />
            </div>

            <div className="mb-4">
              <FloatingLabelInput
                isTextArea
                name="message"
                label="Message"
                labelAr="رسالة"
                value={formData.message}
                onChange={handleChange}
                icon={<MessageSquare size={18} />}
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg group hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send size={20} className={`group-hover:translate-x-${language === 'ar' ? '-1' : '1'} group-hover:-translate-y-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
              {t('Send Message via WhatsApp', 'أرسل عبر الواتساب')}
            </button>
            
            <p className="text-center text-muted text-sm mt-6">
              {t("We'll respond to you as soon as possible! ✨", 'سنرد عليك في أقرب وقت ممكن! ✨')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
