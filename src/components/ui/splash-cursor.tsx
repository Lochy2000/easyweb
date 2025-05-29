"use client";
import { useEffect, useRef } from "react";

function SplashCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d');
    const particles = [];

    // Create particle on mouse move
    const createParticle = (x, y) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        size: Math.random() * 3 + 1,
        color: `hsl(${180 + Math.random() * 60}, 100%, 70%)`
      });
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create multiple particles for trail effect
      for (let i = 0; i < 3; i++) {
        createParticle(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      requestAnimationFrame(animate);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

export { SplashCursor };