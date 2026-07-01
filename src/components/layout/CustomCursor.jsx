import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = memo(() => {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const requestRef = useRef(null);

  // Use refs for positions to avoid React state re-renders (Performance Rule #1)
  const mouse = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const pos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const state = useRef({ hovered: false, text: '', isButton: false, isMagnetic: false });
  const magneticTarget = useRef(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Magnetic effect calculation
      if (state.current.isMagnetic && magneticTarget.current) {
        const rect = magneticTarget.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Attract cursor towards center of target
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        mouse.current.x = centerX + distanceX * 0.1;
        mouse.current.y = centerY + distanceY * 0.1;
        
        // Move the button itself slightly
        magneticTarget.current.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
      }
    };

    const updateCursor = () => {
      // Smooth easing (LERP)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        const size = state.current.hovered ? (state.current.text ? 80 : 40) : 12;
        const opacity = state.current.isButton ? 0 : 1; // Hide standard cursor over magnetic buttons
        
        cursorRef.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0)`;
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
        cursorRef.current.style.opacity = opacity;
        
        if (state.current.text) {
          cursorRef.current.style.mixBlendMode = 'normal';
          cursorRef.current.style.background = 'rgba(255, 255, 255, 0.9)';
        } else if (state.current.hovered) {
          cursorRef.current.style.mixBlendMode = 'difference';
          cursorRef.current.style.background = 'white';
        } else {
          cursorRef.current.style.mixBlendMode = 'difference';
          cursorRef.current.style.background = 'white';
        }
      }

      if (labelRef.current) {
        labelRef.current.innerText = state.current.text;
        labelRef.current.style.opacity = state.current.text ? 1 : 0;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const cursorText = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isMagneticBtn = target.closest('[data-magnetic]');

      if (cursorText) {
        state.current = { hovered: true, text: cursorText, isButton: false, isMagnetic: false };
      } else if (isMagneticBtn) {
        state.current = { hovered: true, text: '', isButton: true, isMagnetic: true };
        magneticTarget.current = isMagneticBtn;
        magneticTarget.current.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      } else if (target.closest('a') || target.closest('button')) {
        state.current = { hovered: true, text: '', isButton: false, isMagnetic: false };
      } else {
        state.current = { hovered: false, text: '', isButton: false, isMagnetic: false };
      }
    };

    const onMouseOut = (e) => {
      const isMagneticBtn = e.target.closest('[data-magnetic]');
      if (isMagneticBtn) {
        isMagneticBtn.style.transform = 'translate(0px, 0px)';
        magneticTarget.current = null;
      }
      state.current = { hovered: false, text: '', isButton: false, isMagnetic: false };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        width: '12px',
        height: '12px',
        background: 'white',
        mixBlendMode: 'difference',
        willChange: 'transform, width, height',
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, opacity 0.3s ease',
      }}
    >
      <span
        ref={labelRef}
        className="text-[10px] font-bold text-black font-jetbrains tracking-widest whitespace-nowrap opacity-0 transition-opacity duration-300"
      ></span>
    </div>
  );
});
CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
