'use client';

import React, { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';
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

// Bahasa disimpan di localStorage; dibaca via useSyncExternalStore
// agar SSR aman (server selalu 'id') tanpa setState di effect.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getLanguageSnapshot(): Language {
  try {
    const saved = localStorage.getItem('kumoart-language');
    return saved === 'en' ? 'en' : 'id';
  } catch {
    return 'id';
  }
}

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getLanguageSnapshot,
    () => 'id' as Language,
  );

  // Save language to localStorage
  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem('kumoart-language', lang);
    } catch (e) {
      console.error('Failed to save language to localStorage', e);
    }
    listeners.forEach((listener) => listener());
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
