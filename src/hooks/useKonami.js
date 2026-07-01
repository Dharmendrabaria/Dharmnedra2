import { useEffect } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

/**
 * Fires callback when Konami code is entered
 */
export const useKonami = (callback) => {
  useEffect(() => {
    let pos = 0;
    const handler = (e) => {
      if (e.key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) { callback(); pos = 0; }
      } else {
        pos = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
};
