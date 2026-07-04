import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { on } from '../../utils/events';

const Toast = memo(() => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsub = on('toast', ({ message, icon = '⚡' }) => {
      const id = Date.now();
      setToasts(prev => [...prev.slice(-2), { id, message, icon }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    });
    return unsub;
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 z-[9998] flex flex-col items-center gap-2 pointer-events-none"
      style={{ transform: 'translateX(-50%)' }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 backdrop-blur-xl text-sm font-inter font-medium text-white whitespace-nowrap shadow-xl"
            style={{ background: 'rgba(15,15,20,0.85)' }}
          >
            <span>{t.icon}</span>
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});
Toast.displayName = 'Toast';
export default Toast;
