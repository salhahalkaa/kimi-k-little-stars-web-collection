import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  type: 'circle' | 'star' | 'heart' | 'cloud';
  rotation: number;
  rotationSpeed: number;
  pulsePhase: number;
  isInteractive?: boolean;
  life?: number;
  maxLife?: number;
}

const colors = [
  'rgba(245, 166, 35, ',   // Logo Gold
  'rgba(27, 42, 71, ',     // Logo Navy
  'rgba(224, 142, 121, ',  // Logo Coral/Rose Gold
  'rgba(255, 255, 255, ',  // White
  'rgba(247, 183, 77, ',   // Logo Gold Light
  'rgba(230, 167, 149, ',  // Logo Coral Light
];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const spawnParticle = (x: number, y: number, isInteractive = false) => {
      const types: Particle['type'][] = isInteractive ? ['star'] : ['circle', 'star', 'heart', 'cloud'];
      const size = isInteractive ? Math.random() * 15 + 5 : Math.random() * 20 + 8;
      const opacity = isInteractive ? 0.8 : Math.random() * 0.3 + 0.1;
      
      return {
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * (isInteractive ? 4 : 0.5),
        speedY: isInteractive ? (Math.random() - 0.5) * 4 : -Math.random() * 0.5 - 0.2,
        opacity: opacity,
        maxOpacity: opacity,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * (isInteractive ? 10 : 2),
        pulsePhase: Math.random() * Math.PI * 2,
        isInteractive,
        life: isInteractive ? 100 : undefined,
        maxLife: isInteractive ? 100 : undefined,
      };
    };

    // Initialize particles
    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const baseCount = isMobile ? 30 : 60;
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), baseCount);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(spawnParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        ));
      }
    };

    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (Math.random() > 0.7) {
        particlesRef.current.push(spawnParticle(e.clientX, e.clientY, true));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push(spawnParticle(e.clientX, e.clientY, true));
      }
    };

    // Touch tracking
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        if (Math.random() > 0.6) {
          particlesRef.current.push(spawnParticle(touch.clientX, touch.clientY, true));
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        for (let i = 0; i < 6; i++) {
          particlesRef.current.push(spawnParticle(touch.clientX, touch.clientY, true));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Draw functions
    const drawCircle = (p: Particle) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
    };

    const drawStar = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos((18 + i * 72) * Math.PI / 180) * p.size,
          -Math.sin((18 + i * 72) * Math.PI / 180) * p.size
        );
        ctx.lineTo(
          Math.cos((54 + i * 72) * Math.PI / 180) * p.size * 0.4,
          -Math.sin((54 + i * 72) * Math.PI / 180) * p.size * 0.4
        );
      }
      ctx.closePath();
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.beginPath();
      const s = p.size;
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s, s * 0.3, 0, s);
      ctx.bezierCurveTo(s, s * 0.3, s, -s * 0.5, 0, s * 0.3);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
      ctx.restore();
    };

    const drawCloud = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      const s = p.size;
      ctx.beginPath();
      ctx.arc(-s * 0.5, 0, s * 0.4, 0, Math.PI * 2);
      ctx.arc(0, -s * 0.2, s * 0.5, 0, Math.PI * 2);
      ctx.arc(s * 0.5, 0, s * 0.4, 0, Math.PI * 2);
      ctx.arc(0, s * 0.1, s * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (p.opacity * 0.5) + ')';
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Clean up interactive particles that are dead
      particlesRef.current = particlesRef.current.filter(p => !p.isInteractive || (p.life && p.life > 0));

      // Limit total particles for performance
      if (particlesRef.current.length > 200) {
        particlesRef.current.splice(60, 20); // Remove some interactive ones
      }

      particlesRef.current.forEach((p) => {
        // 3D Parallax Effect - larger particles move faster
        const parallaxFactor = p.size / 15;
        
        // Update position
        p.x += p.speedX * (p.isInteractive ? 1 : parallaxFactor);
        p.y += p.speedY * (p.isInteractive ? 1 : parallaxFactor);
        p.rotation += p.rotationSpeed;
        p.pulsePhase += 0.02;

        // Interactive lifecycle
        if (p.isInteractive && p.life !== undefined && p.maxLife !== undefined) {
          p.life--;
          p.opacity = (p.life / p.maxLife) * p.maxOpacity;
          p.size *= 0.99; // Shrink slightly
        }

        // Mouse interaction - particles move away from cursor (only for background ones)
        if (!p.isInteractive) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x += (dx / dist) * force * 3;
            p.y += (dy / dist) * force * 3;
          }

          // Wrap around screen
          if (p.y < -p.size * 2) {
            p.y = window.innerHeight + p.size * 2;
            p.x = Math.random() * window.innerWidth;
          }
          if (p.x < -p.size * 2) p.x = window.innerWidth + p.size * 2;
          if (p.x > window.innerWidth + p.size * 2) p.x = -p.size * 2;
        }

        // Pulse size
        const pulseSize = p.size * (1 + Math.sin(p.pulsePhase) * 0.15);

        // Draw based on type
        const drawP = { ...p, size: pulseSize };
        switch (p.type) {
          case 'circle': {
            drawCircle(drawP);
            // Glow effect for circles
            ctx.beginPath();
            ctx.arc(p.x, p.y, pulseSize * 1.5, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 1.5);
            gradient.addColorStop(0, p.color + (p.opacity * 0.15) + ')');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
          }
          case 'star':
            drawStar(drawP);
            if (p.isInteractive) {
                // Extra glow for interactive stars
                ctx.beginPath();
                ctx.arc(p.x, p.y, pulseSize * 2, 0, Math.PI * 2);
                const starGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 2);
                starGlow.addColorStop(0, p.color + (p.opacity * 0.3) + ')');
                starGlow.addColorStop(1, 'transparent');
                ctx.fillStyle = starGlow;
                ctx.fill();
            }
            break;
          case 'heart':
            drawHeart(drawP);
            break;
          case 'cloud':
            drawCloud(drawP);
            break;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleVisibilityChange = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      isActiveRef.current = document.visibilityState === 'visible' && !prefersReduced;
    };
    
    // Initial check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isActiveRef.current = false;
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
