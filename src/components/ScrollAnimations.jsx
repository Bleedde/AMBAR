import { useEffect, useRef, useState } from 'react';

// Hook para detectar cuando un elemento es visible
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Una vez visible, dejamos de observar para mejor performance
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Componente wrapper para animaciones fade-in
export const FadeIn = ({ children, delay = 0, duration = 0.6, direction = 'up' }) => {
  const [ref, isVisible] = useScrollAnimation();

  const directions = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: ''
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-${Math.round(duration * 1000)} ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directions[direction]}`
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// Componente para animaciones en cascada
export const StaggeredFadeIn = ({ children, staggerDelay = 0.1 }) => {
  return (
    <>
      {children.map((child, index) => (
        <FadeIn key={index} delay={index * staggerDelay}>
          {child}
        </FadeIn>
      ))}
    </>
  );
};