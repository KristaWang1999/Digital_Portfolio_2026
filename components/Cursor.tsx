
import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
    if (isTouch) return;

    let mouseX = 0, mouseY = 0;
    let secX = 0, secY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mainRef.current) {
        mainRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      // Lerp for smooth trail
      secX += (mouseX - secX) * 0.15;
      secY += (mouseY - secY) * 0.15;
      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate(${secX}px, ${secY}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div 
        ref={mainRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-1.5 -mt-1.5 transition-transform duration-75"
      />
      <div 
        ref={secondaryRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#7700FF] rounded-full pointer-events-none z-[9998] -ml-5 -mt-5 opacity-50 shadow-[0_0_15px_#7700FF]"
      />
    </>
  );
};

export default Cursor;
