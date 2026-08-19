'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface CvModalContextType {
  isCvModalOpen: boolean;
  cvUrl: string;
  openCvModal: (url?: string) => void;
  closeCvModal: () => void;
}

const CvModalContext = createContext<CvModalContextType>({
  isCvModalOpen: false,
  cvUrl: '/cv.pdf',
  openCvModal: () => {},
  closeCvModal: () => {},
});

export function CvModalProvider({ children }: { children: React.ReactNode }) {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState('/cv.pdf');

  const openCvModal = useCallback((url?: string) => {
    if (url) {
      setCvUrl(url);
    }
    setIsCvModalOpen(true);
  }, []);

  const closeCvModal = useCallback(() => {
    setIsCvModalOpen(false);
  }, []);

  return (
    <CvModalContext.Provider
      value={{
        isCvModalOpen,
        cvUrl,
        openCvModal,
        closeCvModal,
      }}
    >
      {children}
    </CvModalContext.Provider>
  );
}

export function useCvModal() {
  const context = useContext(CvModalContext);
  if (!context) {
    throw new Error('useCvModal must be used within a CvModalProvider');
  }
  return context;
}
