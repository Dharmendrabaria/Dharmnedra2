import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const triggerEasterEgg = (type) => {
  window.dispatchEvent(new CustomEvent('EASTER_EGG', { detail: { type } }));
};

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Translucent black background creates the trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps is fine for matrix rain
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9000] pointer-events-none" style={{ background: 'black' }} />;
};

const EasterEggs = () => {
  const [activeEgg, setActiveEgg] = useState(null); // 'matrix' | 'coffee' | null

  useEffect(() => {
    const handleEgg = (e) => {
      const type = e.detail.type;
      setActiveEgg(type);
      
      // Auto dismiss after a while
      if (type === 'coffee') {
        setTimeout(() => setActiveEgg(null), 6000);
      } else if (type === 'matrix') {
        setTimeout(() => setActiveEgg(null), 10000); // 10 seconds of matrix
      }
    };

    window.addEventListener('EASTER_EGG', handleEgg);
    return () => window.removeEventListener('EASTER_EGG', handleEgg);
  }, []);

  return (
    <AnimatePresence>
      {activeEgg === 'matrix' && (
        <motion.div
          key="matrix"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9000] pointer-events-none"
        >
          <MatrixRain />
          <div className="absolute inset-0 flex items-center justify-center z-[9001]">
             <div className="bg-black/80 px-6 py-3 border border-green-500/30 text-green-500 font-jetbrains text-xl backdrop-blur-sm">
               Wake up, Neo...
             </div>
          </div>
        </motion.div>
      )}

      {activeEgg === 'coffee' && (
        <motion.div
          key="coffee"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-24 right-8 z-[9000] glass-premium border border-amber-500/30 p-6 rounded-2xl max-w-sm flex items-start gap-4 shadow-2xl"
        >
          <div className="text-4xl">☕</div>
          <div>
            <h4 className="font-grotesk font-bold text-white mb-1">Developer Fueled!</h4>
            <p className="text-sm text-gray-400 font-inter">
              "I turn coffee into code. Right now, I'm at peak optimization levels."
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEggs;
