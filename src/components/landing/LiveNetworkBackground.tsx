import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
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

    // Responsive canvas resizing with Retina support
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

    // Color palette matching the reference image: emerald green & violet/indigo nodes
    const nodeColors = [
      { color: '#10b981', glow: 'rgba(16, 185, 129, 0.45)' }, // Emerald Verified
      { color: '#34d399', glow: 'rgba(52, 211, 153, 0.35)' }, // Mint Green
      { color: '#818cf8', glow: 'rgba(129, 140, 248, 0.45)' }, // Indigo Lavender
      { color: '#6366f1', glow: 'rgba(99, 102, 241, 0.35)' }, // Deep Violet
    ];

    // Initialize particles
    const particleCount = Math.max(28, Math.min(55, Math.floor((width * height) / 25000)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorScheme = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 2.5, // 2.5px to 5px
        color: colorScheme.color,
        glowColor: colorScheme.glow,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Interactive mouse tethering
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

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.42;

      // 1. Draw Concentric Orbital / Radar Circles (from reference image)
      rotationAngle += 0.0008;
      const ringRadii = [180, 320, 480, 660, 860];

      ctx.save();
      ringRadii.forEach((radius, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0
          ? 'rgba(99, 102, 241, 0.07)'
          : 'rgba(16, 185, 129, 0.05)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash(idx === 1 || idx === 3 ? [6, 12] : []);
        ctx.stroke();
      });
      ctx.restore();

      // 2. Draw Network Connecting Edges (Lines between nearby nodes)
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Subtle gradient line between nodes
            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            grad.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
            grad.addColorStop(1, `rgba(16, 185, 129, ${alpha})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse if nearby
        if (mouseX > 0 && mouseY > 0) {
          const mdx = particles[i].x - mouseX;
          const mdy = particles[i].y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 180) {
            const mAlpha = (1 - mDist / 180) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(129, 140, 248, ${mAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Particles (Glowing constellation nodes)
      particles.forEach(p => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently on edges
        if (p.x < 10) {
          p.x = 10;
          p.vx *= -1;
        } else if (p.x > width - 10) {
          p.x = width - 10;
          p.vx *= -1;
        }

        if (p.y < 10) {
          p.y = 10;
          p.vy *= -1;
        } else if (p.y > height - 10) {
          p.y = height - 10;
          p.vy *= -1;
        }

        // Pulsing glow radius
        p.pulsePhase += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulsePhase) * 0.8;

        // Outer glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
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
            'radial-gradient(circle at 50% 25%, #0f1629 0%, #090e1c 50%, #050811 100%)',
        }}
      />

      {/* Subtle Luminous Aurora Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-brand-600/18 via-emerald-500/12 to-violet-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[400px] bg-gradient-to-br from-emerald-600/10 via-brand-600/10 to-transparent blur-[110px] rounded-full pointer-events-none" />

      {/* Live Animated Canvas (Constellations, Orbitals, Glowing Nodes) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />

      {/* Subtle Grid / Noise Overlay for tactile texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};
