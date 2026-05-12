import { useEffect, useRef, useCallback } from 'react';

interface ClickStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

const starColors = ['#F5A623', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#95E1D3'];

export function useClickStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<ClickStar[]>([]);
  const animationRef = useRef<number | null>(null);

  const spawnStar = useCallback((x: number, y: number) => {
    const numStars = Math.floor(Math.random() * 3) + 2; // Spawn 2-4 stars per click
    
    for (let i = 0; i < numStars; i++) {
      const angle = (Math.PI * 2 * i) / numStars + Math.random() * 0.5;
      const speed = Math.random() * 3 + 2;
      
      const star: ClickStar = {
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 15 + 10,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // Slight upward bias
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      };
      starsRef.current.push(star);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create canvas for stars
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '100';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Click handler
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnStar(x, y);
    };

    // Touch handler
    const handleTouch = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      spawnStar(x, y);
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('touchstart', handleTouch, { passive: true });

    // Draw star shape
    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current = starsRef.current.filter((star) => {
        star.life++;
        star.x += star.vx;
        star.y += star.vy;
        star.vy += 0.15; // Gravity
        star.vx *= 0.98; // Air resistance
        star.rotation += star.rotationSpeed;

        const lifeProgress = star.life / star.maxLife;
        star.opacity = 1 - lifeProgress;

        if (star.life >= star.maxLife || star.opacity <= 0) {
          return false;
        }

        // Draw star with glow
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate((star.rotation * Math.PI) / 180);
        ctx.globalAlpha = star.opacity;

        // Glow effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, star.size * 1.5);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.5, star.color + '80');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, star.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Star shape
        ctx.fillStyle = star.color;
        drawStar(ctx, 0, 0, 5, star.size, star.size * 0.4);
        ctx.fill();

        // Sparkle
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(-star.size * 0.3, -star.size * 0.3, star.size * 0.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('touchstart', handleTouch);
      canvas.remove();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spawnStar]);

  return containerRef;
}
