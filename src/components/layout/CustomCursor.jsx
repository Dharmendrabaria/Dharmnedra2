import React, { useEffect, useRef, memo } from 'react';

// Cursor modes
const MODE = {
  DEFAULT: 'default',
  LINK:    'link',
  BUTTON:  'button',
  VIEW:    'view',
  IMAGE:   'image',
};

const CustomCursor = memo(() => {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const labelRef  = useRef(null);
  const rafRef    = useRef(null);

  const mouse  = useRef({ x: window.innerWidth / 2,  y: window.innerHeight / 2 });
  const pos    = useRef({ x: window.innerWidth / 2,  y: window.innerHeight / 2 });
  const state  = useRef({ mode: MODE.DEFAULT, text: '', magTarget: null });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // ── Mouse move ───────────────────────────────────────────────────
    const onMove = (e) => {
      const { mode, magTarget } = state.current;

      if (mode === MODE.BUTTON && magTarget) {
        const r  = magTarget.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        mouse.current = { x: cx + dx * 0.15, y: cy + dy * 0.15 };
        magTarget.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
      } else {
        mouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    // ── RAF draw loop ────────────────────────────────────────────────
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.14;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.14;

      const { mode, text } = state.current;
      const el  = cursorRef.current;
      const ring = ringRef.current;
      const lbl = labelRef.current;

      if (el) {
        let size = 12, bg = 'white', border = 'none', blend = 'difference', opacity = 1;

        if (mode === MODE.BUTTON) {
          size = 56; bg = 'rgba(255,255,255,0.08)'; border = '1px solid rgba(255,255,255,0.2)'; blend = 'normal';
        } else if (mode === MODE.LINK) {
          size = 28; bg = 'transparent'; border = '1.5px solid rgba(255,255,255,0.55)'; blend = 'normal';
        } else if (mode === MODE.VIEW) {
          size = 80; bg = 'rgba(255,255,255,0.05)'; border = '1px solid rgba(255,255,255,0.12)'; blend = 'normal';
        } else if (mode === MODE.IMAGE) {
          size = 40; bg = 'rgba(255,255,255,0.07)'; border = '1px solid rgba(255,255,255,0.15)'; blend = 'normal';
        }

        el.style.transform  = `translate3d(${pos.current.x - size/2}px, ${pos.current.y - size/2}px, 0)`;
        el.style.width      = `${size}px`;
        el.style.height     = `${size}px`;
        el.style.background = bg;
        el.style.border     = border;
        el.style.mixBlendMode = blend;
        el.style.opacity    = `${opacity}`;
        el.style.backdropFilter = mode === MODE.VIEW ? 'blur(4px)' : 'none';
      }

      if (lbl) {
        lbl.innerText       = text;
        lbl.style.opacity   = text ? '1' : '0';
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // ── Element detection ────────────────────────────────────────────
    const onOver = (e) => {
      const t         = e.target;
      const viewAttr  = t.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isMag     = t.closest('[data-magnetic]');
      const isBtn     = t.closest('button') || t.closest('[role="button"]');
      const isLink    = t.closest('a');
      const isImg     = t.tagName === 'IMG';

      if (viewAttr) {
        state.current = { mode: MODE.VIEW, text: viewAttr, magTarget: null };
      } else if (isMag) {
        state.current = { mode: MODE.BUTTON, text: 'CLICK', magTarget: isMag };
        isMag.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1)';
      } else if (isBtn) {
        state.current = { mode: MODE.BUTTON, text: 'CLICK', magTarget: null };
      } else if (isLink) {
        state.current = { mode: MODE.LINK, text: '', magTarget: null };
      } else if (isImg) {
        state.current = { mode: MODE.IMAGE, text: '', magTarget: null };
      } else {
        state.current = { mode: MODE.DEFAULT, text: '', magTarget: null };
      }
    };

    const onOut = (e) => {
      const mag = e.target.closest('[data-magnetic]');
      if (mag) mag.style.transform = 'translate(0,0)';
      state.current = { mode: MODE.DEFAULT, text: '', magTarget: null };
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout',  onOut,  { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        width: '12px', height: '12px',
        background: 'white',
        mixBlendMode: 'difference',
        willChange: 'transform, width, height',
        transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, border 0.25s ease, backdrop-filter 0.25s ease',
      }}
    >
      <span
        ref={labelRef}
        className="text-[10px] font-bold text-white font-jetbrains tracking-widest whitespace-nowrap opacity-0 select-none"
        style={{ transition: 'opacity 0.2s ease' }}
      />
    </div>
  );
});

CustomCursor.displayName = 'CustomCursor';
export default CustomCursor;
