import { useEffect, useRef, useCallback } from 'react';

interface BokehStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  hue: number;
}

export function useBokehStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<BokehStar[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);
  const lastSpawnRef = useRef(0);

  const spawnStar = useCallback((x: number, y: number) => {
    const star: BokehStar = {
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: Math.random() * 8 + 3,
      opacity: Math.random() * 0.6 + 0.4,
      life: 0,
      maxLife: Math.random() * 60 + 40,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5 - 0.3,
      hue: Math.random() > 0.7 ? 45 : (Math.random() > 0.5 ? 200 : 280), // Gold, blue, or purple
    };
    starsRef.current.push(star);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Spawn stars near cursor
      const now = performance.now();
      if (now - lastSpawnRef.current > 30) { // Limit spawn rate
        const numStars = Math.random() > 0.5 ? 2 : 1;
        for (let i = 0; i < numStars; i++) {
          spawnStar(mouseRef.current.x, mouseRef.current.y);
        }
        lastSpawnRef.current = now;
      }
    };

    // Touch handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };

      const now = performance.now();
      if (now - lastSpawnRef.current > 50) {
        spawnStar(mouseRef.current.x, mouseRef.current.y);
        lastSpawnRef.current = now;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw stars
      starsRef.current = starsRef.current.filter((star) => {
        star.life++;
        star.x += star.vx;
        star.y += star.vy;

        // Calculate fade based on life
        const lifeProgress = star.life / star.maxLife;
        const currentOpacity = star.opacity * (1 - lifeProgress) * (lifeProgress < 0.2 ? lifeProgress * 5 : 1);

        if (star.life >= star.maxLife || currentOpacity <= 0) {
          return false;
        }

        // Draw bokeh star with glow
        const centerX = star.x;
        const centerY = star.y;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, star.size * 3
        );
        
        const color = star.hue === 45 
          ? `245, 200, 66` // Gold
          : star.hue === 200 
            ? `100, 200, 255` // Blue
            : `180, 120, 255`; // Purple

        gradient.addColorStop(0, `rgba(${color}, ${currentOpacity * 0.8})`);
        gradient.addColorStop(0.3, `rgba(${color}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(0.6, `rgba(${color}, ${currentOpacity * 0.1})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(centerX, centerY, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Pause animation when tab is hidden
    const handleVisibilityChange = () => {
      isActiveRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spawnStar]);

  return canvasRef;
}
