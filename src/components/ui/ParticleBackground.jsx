import { useEffect, useRef, memo } from 'react';

const COLORS = [
  [0, 240, 255],     // Cyan
  [37, 99, 235],     // Neon Blue
  [124, 58, 237],    // Electric Purple
  [255, 255, 255],   // White
];

const ParticleBackground = memo(() => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: -9999, y: -9999 },
    raf: null,
    visible: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const s = stateRef.current;
    const MAX_DIST = 160;

    // ── Init ──────────────────────────────────────────────────────────
    const init = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
      
      const particleCount = window.innerWidth < 768 ? 45 : 85;
      
      s.particles = Array.from({ length: particleCount }, () => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        // White is very subtle
        const isWhite = color[0] === 255;
        const opacity = isWhite 
          ? (Math.random() * 0.05 + 0.02)
          : (Math.random() * 0.08 + 0.03);
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2 + 1,
          color,
          opacity,
        };
      });
    };

    // ── Draw ──────────────────────────────────────────────────────────
    const draw = () => {
      if (!s.visible) {
        s.raf = null; // completely stop loop
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;

      s.particles.forEach((p, i) => {
        // Magnetic attraction to mouse
        const dx = s.mouse.x - p.x;
        const dy = s.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx * 0.00006;
          p.vy += dy * 0.00006;
        }

        // Velocity cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.8) {
          p.vx = (p.vx / speed) * 0.8;
          p.vy = (p.vy / speed) * 0.8;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.opacity})`;
        ctx.fill();

        // Draw connection lines
        for (let j = i + 1; j < s.particles.length; j++) {
          const q = s.particles[j];
          const ldx = p.x - q.x;
          const ldy = p.y - q.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
          if (ldist < MAX_DIST) {
            // max opacity 12% (0.12) as per requirements
            const lineOpacity = (1 - ldist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      s.raf = requestAnimationFrame(draw);
    };

    // ── Events ────────────────────────────────────────────────────────
    const onResize = () => init();
    const onMouse = (e) => { s.mouse.x = e.clientX; s.mouse.y = e.clientY; };
    const onMouseLeave = () => { s.mouse.x = -9999; s.mouse.y = -9999; };
    const onVisibility = () => { s.visible = document.visibilityState === 'visible'; };

    const obs = new IntersectionObserver(
      ([entry]) => { 
        s.visible = entry.isIntersecting; 
        // Resume animation if it became visible and wasn't running
        if (s.visible && !s.raf) {
          draw();
        }
      },
      { threshold: 0 }
    );
    obs.observe(canvas);

    init();
    draw();

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      obs.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';
export default ParticleBackground;
