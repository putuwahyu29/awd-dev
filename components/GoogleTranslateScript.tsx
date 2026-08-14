'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean; includedLanguages?: string },
          containerId: string
        ) => void;
      };
    };
  }
}

export default function GoogleTranslateScript() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'id',
            includedLanguages: 'id,en',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };
  }, []);

  return (
    <>
      <div id="google-translate-container" style={{ display: 'none', visibility: 'hidden' }}>
        <div id="google_translate_element" />
      </div>
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
