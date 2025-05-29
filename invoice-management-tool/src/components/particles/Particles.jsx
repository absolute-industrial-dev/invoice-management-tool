import { useMemo } from 'react';

export default function ParticleBackground() {
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => {
      const size = Math.random() * 12 + 8;
      const duration = Math.random() * 20 + 10;
      const left = Math.random() * 100;

      return {
        id: i,
        size,
        duration,
        left,
      };
    });
  }, []); // only run once

  return (
    <div className="particle-background">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
