'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    // Circle follows with smooth delay
    const animateCircle = () => {
      const speed = 0.15;
      circleX += (mouseX - circleX) * speed;
      circleY += (mouseY - circleY) * speed;

      circle.style.left = `${circleX}px`;
      circle.style.top = `${circleY}px`;

      requestAnimationFrame(animateCircle);
    };

    const handleHoverStart = () => {
      circle.classList.add('hovered');
    };

    const handleHoverEnd = () => {
      circle.classList.remove('hovered');
    };

    // Add hover listeners to interactive elements
    document.querySelectorAll('a, button').forEach(element => {
      element.addEventListener('mouseenter', handleHoverStart);
      element.addEventListener('mouseleave', handleHoverEnd);
    });

    document.body.addEventListener('mousemove', moveCursor);
    animateCircle();

    return () => {
      document.body.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button').forEach(element => {
        element.removeEventListener('mouseenter', handleHoverStart);
        element.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className='cursor-dot' />
      <div ref={circleRef} className='cursor-circle' />
    </>
  );
}
