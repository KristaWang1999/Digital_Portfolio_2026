
import React, { useState, useRef } from 'react';
import { Project, Language } from '../types';

interface WorkCardProps {
  project: Project;
  lang: Language;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ project, lang, onClick, onEdit }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D rotation calculation
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="group relative cursor-pointer w-full"
      style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* 
        The Transform Container
        - Shortened height from 520px to 480px.
        - Using will-change-transform for GPU acceleration.
      */}
      <div 
        ref={cardRef}
        className="relative h-[480px] w-full transition-all duration-500 ease-out will-change-transform"
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
          zIndex: isHovered ? 20 : 1,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {/* Inner Wrapper - Preserves rounded corners and clipping */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl flex flex-col transform-gpu">
          
          {/* Background Image with Mask */}
          <div className="absolute inset-0 z-0">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Dark radial/linear gradient blend for content readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-[#050505]/30" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          {/* Action Row */}
          <div className="relative z-20 p-7 flex justify-between items-start">
            <div className="px-5 py-1.5 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-[10px] mono text-white/80 font-bold tracking-[0.2em] uppercase">
              {project.year}
            </div>
            
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black shadow-xl transform group-hover:rotate-45 transition-transform duration-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 19L19 5m0 0H8m11 0v11" />
              </svg>
            </div>
          </div>

          {/* Text Content - Positioned Bottom */}
          <div className="relative z-20 flex-grow px-8 pb-10 flex flex-col justify-end">
            <div className="mb-2">
              <h3 className="text-3xl md:text-[32px] font-bold text-white tracking-tight leading-tight transition-transform duration-500 group-hover:translate-x-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {project.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[10px] mono font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-[#7700FF] transition-colors">
                {project.category.toUpperCase()} / PRODUCT
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/20 mb-6 transform origin-left group-hover:scale-x-105 transition-transform duration-700" />

            {/* Brief Description */}
            <p className="text-[14px] text-gray-400 leading-relaxed font-medium line-clamp-2 group-hover:text-white transition-colors duration-500 max-w-[95%]">
              {project.description}
            </p>
          </div>

          {/* Dynamic Light Overlay */}
          <div 
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{ 
              background: `radial-gradient(400px circle at center, rgba(255,255,255,0.03), transparent 80%)`
            }}
          />
        </div>

        {/* Edit Button for Admin Control */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(e);
          }}
          className="absolute top-7 right-20 z-[40] p-2.5 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20"
        >
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WorkCard;
