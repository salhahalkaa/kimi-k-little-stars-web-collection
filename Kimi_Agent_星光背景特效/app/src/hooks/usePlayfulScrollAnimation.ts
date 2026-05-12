import { useEffect, useRef, useState } from 'react';

export type AnimationType = 
  | 'bounceIn' 
  | 'slideUp' 
  | 'slideLeft' 
  | 'slideRight' 
  | 'scaleIn' 
  | 'rotateIn' 
  | 'flipIn' 
  | 'elasticIn'
  | 'swingIn'
  | 'rollIn';

interface UsePlayfulScrollOptions {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const getInitialStyles = (animation: AnimationType): string => {
  switch (animation) {
    case 'bounceIn':
      return 'opacity-0 scale-0 -rotate-12';
    case 'slideUp':
      return 'opacity-0 translate-y-24';
    case 'slideLeft':
      return 'opacity-0 -translate-x-32';
    case 'slideRight':
      return 'opacity-0 translate-x-32';
    case 'scaleIn':
      return 'opacity-0 scale-50';
    case 'rotateIn':
      return 'opacity-0 rotate-[-180deg] scale-50';
    case 'flipIn':
      return 'opacity-0 [transform:rotateY(90deg)]';
    case 'elasticIn':
      return 'opacity-0 scale-0';
    case 'swingIn':
      return 'opacity-0 [transform:rotateZ(-30deg)_translateY(50px)]';
    case 'rollIn':
      return 'opacity-0 -translate-x-full rotate-[-120deg]';
    default:
      return 'opacity-0 translate-y-8';
  }
};

const getFinalStyles = (animation: AnimationType): string => {
  switch (animation) {
    case 'bounceIn':
    case 'elasticIn':
      return 'opacity-100 scale-100 rotate-0';
    case 'slideUp':
      return 'opacity-100 translate-y-0';
    case 'slideLeft':
      return 'opacity-100 translate-x-0';
    case 'slideRight':
      return 'opacity-100 translate-x-0';
    case 'scaleIn':
      return 'opacity-100 scale-100';
    case 'rotateIn':
      return 'opacity-100 rotate-0 scale-100';
    case 'flipIn':
      return 'opacity-100 [transform:rotateY(0deg)]';
    case 'swingIn':
      return 'opacity-100 [transform:rotateZ(0deg)_translateY(0)]';
    case 'rollIn':
      return 'opacity-100 translate-x-0 rotate-0';
    default:
      return 'opacity-100 translate-y-0';
  }
};

const getTransitionClass = (animation: AnimationType): string => {
  switch (animation) {
    case 'bounceIn':
    case 'elasticIn':
      return 'transition-all duration-700';
    case 'rotateIn':
      return 'transition-all duration-1000';
    case 'flipIn':
      return 'transition-all duration-800';
    default:
      return 'transition-all duration-600';
  }
};

export function usePlayfulScroll<T extends HTMLElement>(
  options: UsePlayfulScrollOptions = {}
) {
  const {
    animation = 'slideUp',
    delay = 0,
    threshold = 0.2,
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggered || !triggerOnce) {
            setIsVisible(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, hasTriggered]);

  const initialStyles = getInitialStyles(animation);
  const finalStyles = getFinalStyles(animation);
  const transitionClass = getTransitionClass(animation);

  const className = `${transitionClass} ${isVisible ? finalStyles : initialStyles}`;

  return { ref, isVisible, className, style: { transitionDelay: `${delay}ms` } };
}

// Hook for staggered children animations
export function useStaggerChildren<T extends HTMLElement>(
  _count: number,
  baseDelay: number = 100,
  animation: AnimationType = 'slideUp'
) {
  const containerRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getChildClass = (index: number): string => {
    const _delay = baseDelay * index;
    void _delay;
    const initialStyles = getInitialStyles(animation);
    const finalStyles = getFinalStyles(animation);
    const transitionClass = getTransitionClass(animation);

    return `${transitionClass} ${isVisible ? finalStyles : initialStyles}`;
  };

  const getChildStyle = (index: number): React.CSSProperties => {
    return { transitionDelay: `${baseDelay * index}ms` };
  };

  return { containerRef, isVisible, getChildClass, getChildStyle };
}

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? currentScroll / docHeight : 0;
      
      setProgress(scrollProgress);
      setDirection(currentScroll > lastScrollRef.current ? 'down' : 'up');
      lastScrollRef.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, direction };
}

// Parallax scroll effect
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}
