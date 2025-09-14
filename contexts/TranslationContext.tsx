import React, { createContext, useState, useCallback, useMemo } from 'react';

interface TranslationContextType {
  isAutoTranslateOn: boolean;
  toggleAutoTranslate: () => void;
  targetLanguage: string;
}

export const TranslationContext = createContext<TranslationContextType>({
  isAutoTranslateOn: false,
  toggleAutoTranslate: () => {},
  targetLanguage: 'English',
});

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [isAutoTranslateOn, setIsAutoTranslateOn] = useState(false);

  const toggleAutoTranslate = useCallback(() => {
    setIsAutoTranslateOn(prev => !prev);
  }, []);

  const targetLanguage = useMemo(() => {
    try {
        const langCode = navigator.language.split('-')[0];
        const displayName = new Intl.DisplayNames(['en'], { type: 'language' }).of(langCode);
        return displayName || 'English';
    } catch (e) {
        return 'English';
    }
  }, []);

  const value = useMemo(() => ({
    isAutoTranslateOn,
    toggleAutoTranslate,
    targetLanguage,
  }), [isAutoTranslateOn, toggleAutoTranslate, targetLanguage]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};