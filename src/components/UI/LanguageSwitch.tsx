'use client';

import { useLanguage, Language } from '@/lib/language';

interface LanguageSwitchProps {
  className?: string;
}

export default function LanguageSwitch({ className = '' }: LanguageSwitchProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'id' ? 'en' : 'id';
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
        language === 'id' ? 'bg-rose-600' : 'bg-gray-700'
      } ${className}`}
      aria-label={`Switch to ${language === 'id' ? 'English' : 'Indonesian'}`}
      role="switch"
      aria-checked={language === 'en'}
    >
      {/* Labels */}
      <span className="absolute left-1.5 text-[10px] font-bold text-white opacity-70">
        ID
      </span>
      <span className="absolute right-1.5 text-[10px] font-bold text-white opacity-70">
        EN
      </span>
      
      {/* Toggle Circle */}
      <span
        className={`inline-flex items-center justify-center w-6 h-6 transform bg-white rounded-full shadow-md transition-transform duration-300 ${
          language === 'en' ? 'translate-x-9' : 'translate-x-1'
        }`}
      >
        {/* Flag Icon */}
        <span className="text-sm">
          {language === 'id' ? '🇮🇩' : '🇬🇧'}
        </span>
      </span>
    </button>
  );
}
