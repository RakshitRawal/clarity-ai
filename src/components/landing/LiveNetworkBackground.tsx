import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export const LiveNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Color palette adapted dynamically for light/dark modes
    const nodeColors = isDark
      ? [
          { color: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' }, // Emerald
          { color: '#34d399', glow: 'rgba(52, 211, 153, 0.25)' }, // Mint
          { color: '#818cf8', glow: 'rgba(129, 140, 248, 0.35)' }, // Lavender
          { color: '#6366f1', glow: 'rgba(99, 102, 241, 0.25)' }, // Indigo
        ]
      : [
          { color: '#059669', glow: 'rgba(5, 150, 105, 0.25)' }, // Forest Emerald
          { color: '#10b981', glow: 'rgba(16, 185, 129, 0.20)' }, // Emerald
          { color: '#6366f1', glow: 'rgba(99, 102, 241, 0.25)' }, // Indigo
          { color: '#4f46e5', glow: 'rgba(79, 70, 229, 0.20)' }, // Deep Violet
        ];

    const isDesktop = width >= 1024;
    const particleCount = isDesktop ? 36 : 20;
    const particles: Particle[] = [];

    const focusX = isDesktop ? width * 0.72 : width * 0.5;
    const focusY = isDesktop ? height * 0.38 : height * 0.55;

    for (let i = 0; i < particleCount; i++) {
      const colorScheme = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (isDesktop ? 450 : 280);
      const px = focusX + Math.cos(angle) * dist + (Math.random() - 0.5) * 120;
      const py = focusY + Math.sin(angle) * dist + (Math.random() - 0.5) * 120;

      particles.push({
        x: Math.max(20, Math.min(width - 20, px)),
        y: Math.max(20, Math.min(height - 20, py)),
        vx: (Math.random() - 0.5) * 0.30,
        vy: (Math.random() - 0.5) * 0.30,
        baseRadius: Math.random() * 1.5 + 1.5,
        color: colorScheme.color,
        glowColor: colorScheme.glow,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDesktopNow = width >= 1024;
      const radarCenterX = isDesktopNow ? width * 0.72 : width * 0.5;
      const radarCenterY = isDesktopNow ? height * 0.40 : height * 0.55;

      // 1. Concentric Orbital / Radar Rings
      const ringRadii = [140, 250, 380, 520, 680];

      ctx.save();
      ringRadii.forEach((radius, idx) => {
        ctx.beginPath();
        ctx.arc(radarCenterX, radarCenterY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? idx % 2 === 0
            ? 'rgba(99, 102, 241, 0.08)'
            : 'rgba(16, 185, 129, 0.06)'
          : idx % 2 === 0
            ? 'rgba(99, 102, 241, 0.12)'
            : 'rgba(16, 185, 129, 0.10)';
        ctx.lineWidth = 1;
        ctx.setLineDash(idx === 1 || idx === 3 ? [4, 8] : []);
        ctx.stroke();
      });
      ctx.restore();

      // 2. Network Edges
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.25 : 0.35);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            if (isDark) {
              grad.addColorStop(0, `rgba(129, 140, 248, ${alpha})`);
              grad.addColorStop(1, `rgba(16, 185, 129, ${alpha})`);
            } else {
              grad.addColorStop(0, `rgba(79, 70, 229, ${alpha})`);
              grad.addColorStop(1, `rgba(5, 150, 105, ${alpha})`);
            }

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Mouse tethering
        if (mouseX > 0 && mouseY > 0) {
          const mdx = particles[i].x - mouseX;
          const mdy = particles[i].y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 150) {
            const mAlpha = (1 - mDist / 150) * (isDark ? 0.30 : 0.40);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = isDark
              ? `rgba(129, 140, 248, ${mAlpha})`
              : `rgba(79, 70, 229, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 3. Render Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 15) { p.x = 15; p.vx *= -1; }
        else if (p.x > width - 15) { p.x = width - 15; p.vx *= -1; }

        if (p.y < 15) { p.y = 15; p.vy *= -1; }
        else if (p.y > height - 15) { p.y = height - 15; p.vy *= -1; }

        p.pulsePhase += p.pulseSpeed;
        const currentRadius = p.baseRadius + Math.sin(p.pulsePhase) * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none transition-colors duration-300">
      {/* Background Gradient Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 70% 35%, #0d1527 0%, #080c16 55%, #04060c 100%)'
            : 'radial-gradient(ellipse at 70% 35%, #eef2ff 0%, #f8fafc 55%, #f1f5f9 100%)',
        }}
      />

      {/* Luminous Aurora Glows */}
      <div
        className={`absolute top-1/3 right-1/4 w-[550px] h-[450px] blur-[120px] rounded-full pointer-events-none transition-all duration-300 ${
          isDark
            ? 'bg-gradient-to-tr from-brand-600/15 via-emerald-500/10 to-violet-500/12'
            : 'bg-gradient-to-tr from-brand-400/25 via-emerald-400/20 to-violet-400/20'
        }`}
      />
      <div
        className={`absolute top-1/4 left-10 w-[400px] h-[350px] blur-[100px] rounded-full pointer-events-none transition-all duration-300 ${
          isDark
            ? 'bg-gradient-to-br from-indigo-900/12 via-brand-900/8 to-transparent'
            : 'bg-gradient-to-br from-indigo-200/40 via-brand-200/30 to-transparent'
        }`}
      />

      {/* Live Animated Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isDark ? 0.025 : 0.045,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#ffffff' : '#0f172a'} 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
