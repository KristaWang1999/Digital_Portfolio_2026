
import React, { useEffect, useRef } from 'react';

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const mouse = { x: -2000, y: -2000, radius: 250 };
    
    // Torus parameters
    let R = Math.min(width, height) * 0.3;
    let r = R * 0.45;
    const particleCount = 3000;

    class Particle {
      u: number;
      v: number;
      x: number = 0;
      y: number = 0;
      z: number = 0;
      px: number = 0;
      py: number = 0;
      color: string = '#A855F7'; // Slightly brighter purple/magenta
      size: number;

      constructor() {
        this.u = Math.random() * Math.PI * 2;
        this.v = Math.random() * Math.PI * 2;
        this.size = Math.random() * 1.8 + 0.6; // Slightly larger
      }

      update(time: number) {
        // Dynamic rotation speeds
        const rotationX = time * 0.00015;
        const rotationY = time * 0.00022;

        // Torus position calculation
        let tx = (R + r * Math.cos(this.v)) * Math.cos(this.u);
        let ty = (R + r * Math.cos(this.v)) * Math.sin(this.u);
        let tz = r * Math.sin(this.v);

        // Apply 3D Rotations
        let x1 = tx * Math.cos(rotationY) + tz * Math.sin(rotationY);
        let z1 = -tx * Math.sin(rotationY) + tz * Math.cos(rotationY);
        let y2 = ty * Math.cos(rotationX) - z1 * Math.sin(rotationX);
        let z2 = ty * Math.sin(rotationX) + z1 * Math.cos(rotationX);

        this.x = x1;
        this.y = y2;
        this.z = z2;

        // Perspective mapping
        const perspective = 1000 / (1000 + this.z);
        this.px = width / 2 + this.x * perspective;
        this.py = height / 2 + this.y * perspective;

        // Mouse interaction: Physics repulsion
        const dx = mouse.x - this.px;
        const dy = mouse.y - this.py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.px -= dx * force * 0.3;
          this.py -= dy * force * 0.3;
        }
      }

      draw() {
        if (!ctx) return;
        // Depth-based opacity
        const depthAlpha = (this.z + r) / (r * 2);
        const alpha = Math.max(0.2, depthAlpha * 0.8);
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(this.px, this.py, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      R = Math.min(width, height) * 0.3;
      r = R * 0.45;
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      // Use 'lighter' (additive) blend mode for a glowing neon effect
      ctx.globalCompositeOperation = 'lighter';
      
      particles.forEach(p => {
        p.update(time);
        p.draw();
      });
      
      // Reset blending for other potential canvas operations
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;
      
      requestAnimationFrame(animate);
    };

    init();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default HeroCanvas;
