'use client';
import { useCallback, useEffect } from 'react';

export default function PreventCopyWrapper({ children }) {
  const handleKey = useCallback((e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && (e.key === 'i' || e.key === 'I')) ||
      (e.ctrlKey && (e.key === 'c' || e.key === 'C')) ||
      (e.ctrlKey && (e.key === 'j' || e.key === 'J')) ||
      (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
    ) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
      onCopy={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </div>
  );
}
