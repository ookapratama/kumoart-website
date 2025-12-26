'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';

// Supported languages
export type { Language };

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  // Load saved language from localStorage safely
  useEffect(() => {
    setMounted(true);
    try {
      const savedLang = localStorage.getItem('kumoart-language') as Language;
      if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error('Failed to load language from localStorage', e);
    }
  }, []);

  // Save language to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kumoart-language', lang);
    } catch (e) {
      console.error('Failed to save language to localStorage', e);
    }
  };

  // Translation function
  const t = (key: string): string => {
    // Falls back to key if translation not found
    return translations[language][key] || key;
  };

  // Provide context
  // Rendering children directly to match layout structure exactly
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Export translations for static pages
export { translations };
