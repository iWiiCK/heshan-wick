import { useState, useEffect } from 'react';
import portfolio from '../data/portfolio.json';

export default function Loader({ ready }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame;
    let current = 0;
    const target = ready ? 100 : 60;
    const speed = ready ? 3 : 0.5;

    const animate = () => {
      current += (target - current) * 0.05 * speed;
      if (current > 99.5 && ready) {
        setProgress(100);
        setTimeout(() => setDone(true), 400);
        return;
      }
      setProgress(Math.min(current, target));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [ready]);

  return (
    <div className={`loader-wrapper ${done ? 'loaded' : ''}`}>
      <div className="loader-name">{portfolio.meta.shortName}</div>
      <div className="loader-progress-track">
        <div
          className="loader-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loader-text">{Math.round(progress)}%</div>
    </div>
  );
}
