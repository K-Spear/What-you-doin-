import { useState, useEffect, useContext } from 'react';
import { gemini } from '../lib/gemini';
import { TranslationContext } from '../contexts/TranslationContext';

export const useTranslation = (originalText: string) => {
  const { isAutoTranslateOn, targetLanguage } = useContext(TranslationContext);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const translateText = async () => {
      if (!isAutoTranslateOn || translatedText || !originalText) return;

      setIsTranslating(true);
      setError(null);
      try {
        const prompt = `Translate the following text to ${targetLanguage}. Provide only the raw translated text, without any additional explanations or formatting.\n\nText to translate: "${originalText}"`;
        
        const response = await gemini.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const translation = response.text.trim();
        setTranslatedText(translation);
      } catch (e) {
         let message = 'An unknown error occurred during translation.';
         if (e instanceof Error) {
           message = `Translation failed. Please ensure your API key is configured correctly.`;
         }
         setError(message);
         console.error(e);
      } finally {
        setIsTranslating(false);
      }
    };

    translateText();
  // We only want this to run when auto-translate is toggled on, or the original text changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoTranslateOn, originalText, targetLanguage]);

  const displayText = isAutoTranslateOn && translatedText ? translatedText : originalText;

  return {
    displayText,
    isTranslating,
    error,
    isTranslated: isAutoTranslateOn && !!translatedText
  };
};