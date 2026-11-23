import React, { useEffect, useRef } from 'react';

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

    // Color palette: Emerald (verified), Indigo/Lavender (model propositions), Mint
    const nodeColors = [
      { color: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' }, // Emerald
      { color: '#34d399', glow: 'rgba(52, 211, 153, 0.25)' }, // Mint
      { color: '#818cf8', glow: 'rgba(129, 140, 248, 0.35)' }, // Lavender
      { color: '#6366f1', glow: 'rgba(99, 102, 241, 0.25)' }, // Indigo
    ];

    // Elegant micro-particles
    const isDesktop = width >= 1024;
    const particleCount = isDesktop ? 38 : 22;
    const particles: Particle[] = [];

    // Focus constellation center on the right side on desktop, center on mobile
    const focusX = isDesktop ? width * 0.72 : width * 0.5;
    const focusY = isDesktop ? height * 0.38 : height * 0.55;

    for (let i = 0; i < particleCount; i++) {
      const colorScheme = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      // Spawn particles distributed with slight bias towards the right hub
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (isDesktop ? 450 : 280);
      const px = focusX + Math.cos(angle) * dist + (Math.random() - 0.5) * 120;
      const py = focusY + Math.sin(angle) * dist + (Math.random() - 0.5) * 120;

      particles.push({
        x: Math.max(20, Math.min(width - 20, px)),
        y: Math.max(20, Math.min(height - 20, py)),
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        baseRadius: Math.random() * 1.5 + 1.5, // 1.5px - 3.0px micro-nodes
        color: colorScheme.color,
        glowColor: colorScheme.glow,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Subtle mouse attraction
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

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDesktopNow = width >= 1024;
      const radarCenterX = isDesktopNow ? width * 0.72 : width * 0.5;
      const radarCenterY = isDesktopNow ? height * 0.40 : height * 0.55;

      // 1. Concentric Orbital / Radar Rings (Subtle and focused behind the claim card)
      rotationAngle += 0.0006;
      const ringRadii = [140, 250, 380, 520, 680];

      ctx.save();
      ringRadii.forEach((radius, idx) => {
        ctx.beginPath();
        ctx.arc(radarCenterX, radarCenterY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0
          ? 'rgba(99, 102, 241, 0.08)'
          : 'rgba(16, 185, 129, 0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash(idx === 1 || idx === 3 ? [4, 8] : []);
        ctx.stroke();
      });
      ctx.restore();

      // 2. Network Edges (Thin, crisp connections)
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            grad.addColorStop(0, `rgba(129, 140, 248, ${alpha})`);
            grad.addColorStop(1, `rgba(16, 185, 129, ${alpha})`);

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
            const mAlpha = (1 - mDist / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(129, 140, 248, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 3. Render Particles (Crisp glowing dots)
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Keep within bounds
        if (p.x < 15) { p.x = 15; p.vx *= -1; }
        else if (p.x > width - 15) { p.x = width - 15; p.vx *= -1; }

        if (p.y < 15) { p.y = 15; p.vy *= -1; }
        else if (p.y > height - 15) { p.y = height - 15; p.vy *= -1; }

        p.pulsePhase += p.pulseSpeed;
        const currentRadius = p.baseRadius + Math.sin(p.pulsePhase) * 0.4;

        // Subtle outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        // Sharp core dot
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
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Deep Cybernetic Cosmic Radial Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 35%, #0d1527 0%, #080c16 55%, #04060c 100%)',
        }}
      />

      {/* Luminous Aurora Glows focused behind the card hub */}
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[450px] bg-gradient-to-tr from-brand-600/15 via-emerald-500/10 to-violet-500/12 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[400px] h-[350px] bg-gradient-to-br from-indigo-900/12 via-brand-900/8 to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Live Animated Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
