import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function useStarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);

  const initStars = useCallback((width: number, height: number) => {
    const starCount = Math.min(Math.floor((width * height) / 8000), 80);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    starsRef.current = stars;
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
      initStars(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      starsRef.current.forEach((star) => {
        // Update position
        star.y -= star.speed * (deltaTime / 16);
        if (star.y < -10) {
          star.y = rect.height + 10;
          star.x = Math.random() * rect.width;
        }
        
        // Update twinkle
        star.twinklePhase += star.twinkleSpeed * (deltaTime / 16);

        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Add glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
          );
          gradient.addColorStop(0, `rgba(245, 200, 66, ${currentOpacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(245, 200, 66, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
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
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initStars]);

  return canvasRef;
}
