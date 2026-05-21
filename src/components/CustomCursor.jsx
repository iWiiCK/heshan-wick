import { useEffect, useRef } from 'react';

const PULSE_DURATION = 600; // ms total for the full pulse cycle

export default function CustomCursor() {
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const pulseRafId = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const circle = circleRef.current;
    if (!svg || !circle) return;

    // --- Smooth mouse follow ---
    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      target.current.x = -100;
      target.current.y = -100;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const follow = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);
      svg.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      rafId.current = requestAnimationFrame(follow);
    };

    rafId.current = requestAnimationFrame(follow);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // --- Pulse animation on glitch trigger ---
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const triggerPulse = () => {
      if (pulseRafId.current) cancelAnimationFrame(pulseRafId.current);

      const startTime = performance.now();

      // Default values
      const baseStroke = 1.5;
      const peakStroke = 4;
      const baseGlow = 0;
      const peakGlow = 12;
      const baseOpacity = 0;
      const peakOpacity = 0.6;

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / PULSE_DURATION, 1);

        // Triangle wave: 0 → 1 → 0 over the duration
        // First half ramps up, second half ramps down
        let intensity;
        if (progress < 0.5) {
          intensity = easeInOutCubic(progress * 2); // 0 → 1
        } else {
          intensity = easeInOutCubic(2 - progress * 2); // 1 → 0
        }

        const currentStroke = baseStroke + (peakStroke - baseStroke) * intensity;
        const currentGlow = baseGlow + (peakGlow - baseGlow) * intensity;
        const currentOpacity = baseOpacity + (peakOpacity - baseOpacity) * intensity;

        circle.setAttribute('stroke-width', currentStroke.toFixed(2));
        circle.style.filter =
          currentGlow > 0.1
            ? `drop-shadow(0 0 ${currentGlow.toFixed(1)}px rgba(255, 255, 255, ${currentOpacity.toFixed(2)}))`
            : 'none';

        if (progress < 1) {
          pulseRafId.current = requestAnimationFrame(tick);
        } else {
          // Ensure we're back to defaults
          circle.setAttribute('stroke-width', baseStroke);
          circle.style.filter = 'none';
          pulseRafId.current = null;
        }
      };

      pulseRafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('glitch-trigger', triggerPulse);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (pulseRafId.current) cancelAnimationFrame(pulseRafId.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('glitch-trigger', triggerPulse);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="custom-cursor"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        ref={circleRef}
        cx="16"
        cy="16"
        r="14"
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
