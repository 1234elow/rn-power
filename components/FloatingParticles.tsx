"use client";

import { useState, useEffect } from "react";

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    left: number;
    delay: number;
    duration: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: Math.random() * 10 + 8, // 8-18px (increased size)
        left: Math.random() * 100, // 0-100%
        delay: Math.random() * 10, // 0-10s delay (faster start)
        duration: Math.random() * 10 + 15, // 15-25s duration (faster)
        opacity: Math.random() * 0.4 + 0.6, // 0.6-1.0 opacity (more visible)
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
