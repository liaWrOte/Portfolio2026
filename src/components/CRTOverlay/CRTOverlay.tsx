import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  children: React.ReactNode;
  onDone: () => void;
}

// Wraps the desktop and reveals it with a CRT power-on effect:
// a warm scanline appears at center, then the content unfolds from it.
const CRTOverlay: React.FC<Props> = ({ children, onDone }) => {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper  = wrapperRef.current;
    const scanline = scanlineRef.current;
    if (!wrapper || !scanline) return;

    // Start collapsed — only the scanline is visible
    gsap.set(wrapper,  { scaleY: 0, transformOrigin: 'center center' });
    gsap.set(scanline, { opacity: 1 });

    const tl = gsap.timeline({ onComplete: onDone });

    // Hold on the scanline briefly
    tl.to({}, { duration: 0.18 });

    // Desktop unfolds from the line toward top and bottom
    tl.to(wrapper, {
      scaleY: 1,
      duration: 0.52,
      ease: 'power2.out',
    });

    // Scanline fades once content is large enough to read
    tl.to(scanline, { opacity: 0, duration: 0.22 }, '-=0.42');

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      {/* Warm phosphor scanline — portfolio colors */}
      <div
        ref={scanlineRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: 0,
          right: 0,
          height: '3px',
          transform: 'translateY(-50%)',
          background:
            'linear-gradient(to right, transparent 0%, #e6a934 18%, #e8e1d7 50%, #e6a934 82%, transparent 100%)',
          boxShadow: '0 0 10px #e6a934, 0 0 22px #d45514, 0 0 4px #e8e1d7',
          zIndex: 10000,
          pointerEvents: 'none',
        }}
      />

      {/* Desktop wrapper — expands from center */}
      <div ref={wrapperRef}>
        {children}
      </div>
    </>
  );
};

export default CRTOverlay;
