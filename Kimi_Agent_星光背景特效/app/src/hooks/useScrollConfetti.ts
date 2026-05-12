import { useEffect, useRef, useCallback } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  opacity: number;
  shape: 'rect' | 'circle' | 'star';
}

const confettiColors = [
  '#F5A623', '#FFD700', '#1B2A47', '#FF8B7B',
  '#A8D5BA', '#B8A9C9', '#A8D4E6', '#FF6B6B',
  '#4ECDC4', '#95E1D3', '#FFA500', '#FF69B4',
];

export function useScrollConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const animationRef = useRef<number | null>(null);
  const firedSections = useRef<Set<string>>(new Set());

  const spawnConfetti = useCallback((x: number, y: number) => {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 8 + 4;
      const shapes: ConfettiPiece['shape'][] = ['rect', 'circle', 'star'];
      
      confettiRef.current.push({
        x: x + (Math.random() - 0.5) * 200,
        y: y + (Math.random() - 0.5) * 50,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.2 + Math.random() * 0.2,
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }
  }, []);

  useEffect(() => {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Watch sections for scroll entry
    const sections = ['stats', 'about', 'programs', 'activities', 'why-us', 'testimonials', 'enroll'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId) || document.querySelector(`[id*="${sectionId}"]`);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !firedSections.current.has(sectionId)) {
            firedSections.current.add(sectionId);
            spawnConfetti(window.innerWidth / 2, window.innerHeight / 3);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    // Draw star shape
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          x + Math.cos((18 + i * 72) * Math.PI / 180) * size,
          y - Math.sin((18 + i * 72) * Math.PI / 180) * size
        );
        ctx.lineTo(
          x + Math.cos((54 + i * 72) * Math.PI / 180) * size * 0.4,
          y - Math.sin((54 + i * 72) * Math.PI / 180) * size * 0.4
        );
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current = confettiRef.current.filter((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += c.gravity;
        c.vx *= 0.99;
        c.rotation += c.rotationSpeed;
        c.opacity -= 0.008;

        if (c.opacity <= 0 || c.y > canvas.height + 50) {
          return false;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;

        if (c.shape === 'rect') {
          ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        } else if (c.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawStar(ctx, 0, 0, c.w / 2);
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      canvas.remove();
      window.removeEventListener('resize', resizeCanvas);
      observers.forEach((o) => o.disconnect());
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spawnConfetti]);

  return spawnConfetti;
}
