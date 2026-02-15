import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.15, y: 0.1, r: 280, speedX: 0.08, speedY: 0.06, color: [200, 80, 192, 0.12], phaseX: 0, phaseY: 0.5 },
      { x: 0.85, y: 0.85, r: 220, speedX: 0.05, speedY: 0.07, color: [88, 28, 135, 0.15], phaseX: 1.2, phaseY: 0 },
      { x: 0.5, y: 0.4, r: 180, speedX: 0.06, speedY: 0.04, color: [231, 127, 191, 0.06], phaseX: 2.4, phaseY: 1.8 },
      { x: 0.3, y: 0.7, r: 240, speedX: 0.04, speedY: 0.05, color: [139, 69, 160, 0.1], phaseX: 3.6, phaseY: 3.0 },
      { x: 0.7, y: 0.2, r: 200, speedX: 0.07, speedY: 0.03, color: [155, 89, 182, 0.08], phaseX: 4.8, phaseY: 2.2 },
    ];

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const orb of orbs) {
        const cx = (orb.x + Math.sin(time * orb.speedX + orb.phaseX) * 0.12) * canvas.width;
        const cy = (orb.y + Math.cos(time * orb.speedY + orb.phaseY) * 0.1) * canvas.height;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, ${orb.color[3]})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-bg" />;
};

export default AnimatedBackground;
