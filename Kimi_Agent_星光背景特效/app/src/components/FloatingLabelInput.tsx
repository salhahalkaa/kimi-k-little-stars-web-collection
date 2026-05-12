import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingLabelInputProps {
  label: string;
  labelAr: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
  isTextArea?: boolean;
}

export default function FloatingLabelInput({
  label,
  labelAr,
  name,
  type = 'text',
  value,
  onChange,
  required,
  icon,
  isTextArea
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { t, language } = useLanguage();

  const isLabelFloating = isFocused || value.length > 0;

  return (
    <div className="relative pt-5 group">
      {/* Icon */}
      <div className={`absolute top-[2.1rem] ${language === 'ar' ? 'right-4' : 'left-4'} z-10 transition-colors duration-300 ${isFocused ? 'text-[#F5A623]' : 'text-muted'}`}>
        {icon}
      </div>

      {/* Label */}
      <label
        className={`absolute transition-all duration-300 pointer-events-none z-10
          ${isLabelFloating 
            ? `-top-1.5 ${language === 'ar' ? 'right-0' : 'left-0'} text-sm font-bold text-[#F5A623]` 
            : `top-[2.0rem] ${language === 'ar' ? 'right-12' : 'left-12'} text-muted`
          }
          ${language === 'ar' ? 'text-right' : 'text-left'}
        `}
      >
        {t(label, labelAr)}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input/TextArea */}
      {isTextArea ? (
        <textarea
          required={required}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={4}
          className={`w-full px-12 py-4 rounded-2xl bg-cream/30 border border-teal/10 focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/10 transition-all outline-none text-primary resize-none ${language === 'ar' ? 'text-right' : 'text-left'}`}
        />
      ) : (
        <input
          required={required}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full h-14 px-12 rounded-2xl bg-cream/30 border border-teal/10 focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/10 transition-all outline-none text-primary ${language === 'ar' ? 'text-right' : 'text-left'}`}
        />
      )}

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-0.5 bg-[#F5A623] transition-all duration-500 ${isFocused ? 'w-full' : 'w-0'}`} />
    </div>
  );
}
