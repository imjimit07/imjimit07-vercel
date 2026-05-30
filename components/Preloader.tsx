import { useEffect, useRef, useState } from 'react';

const Preloader = () => {
  const [hidden, setHidden] = useState(false);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 1500;
    const step = 10;
    const increment = 100 / (duration / step);
    let count = 0;

    const timer = setInterval(() => {
      count = Math.min(count + increment, 100);
      const pct = Math.round(count);
      if (textRef.current) {
        textRef.current.textContent = `loading... ${pct}%`;
      }
      if (fillRef.current) {
        fillRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      }
      if (count >= 100) {
        clearInterval(timer);
      }
    }, step);

    const hideTimer = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = '';
    }, duration + 300);

    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(timer);
      clearTimeout(hideTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (hidden) return null;

  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black'>
      <div className='relative' style={{ lineHeight: 1 }}>
        <span
          className='whitespace-nowrap'
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '4.5rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.15)',
          }}
        >
          Jimit Patel
        </span>
        <span
          ref={fillRef}
          className='absolute left-0 top-0 whitespace-nowrap'
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: '4.5rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#fff',
            clipPath: 'inset(0 100% 0 0)',
          }}
        >
          Jimit Patel
        </span>
        <span
          ref={textRef}
          className='absolute right-0 uppercase'
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            bottom: '-2.5rem',
            fontSize: '0.875rem',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          loading... 0%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
