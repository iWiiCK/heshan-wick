import { useRef, useMemo, useCallback } from 'react';

export default function LiquidCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);

  const unique = useMemo(() => ({
    duration: 18 + Math.random() * 14,
    delay: -(Math.random() * 20),
    angle: Math.floor(Math.random() * 360),
    gx: 20 + Math.random() * 60,
    gy: 50 + Math.random() * 40,
  }), []);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (card) card.classList.add('liquid-hover');
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.classList.remove('liquid-hover');
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`liquid-card ${className}`}
      style={{
        '--lq-duration': `${unique.duration}s`,
        '--lq-delay': `${unique.delay}s`,
        '--lq-angle': `${unique.angle}deg`,
        '--lq-gx': `${unique.gx}%`,
        '--lq-gy': `${unique.gy}%`,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="liquid-card-bg" />
      <div className="liquid-card-glow" />
      <div className="liquid-card-content">
        {children}
      </div>
    </div>
  );
}
