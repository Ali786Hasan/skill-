import React, { useState } from 'react';

interface Logo3DProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  interactive?: boolean;
  className?: string;
  glow?: boolean;
}

export const Logo3D: React.FC<Logo3DProps> = ({
  size = 'md',
  showText = false,
  interactive = true,
  className = '',
  glow = true
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.15);
    setRotateY(x * 0.15);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* 3D Container with Perspective */}
      <div
        className="relative perspective-1000 group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Ambient Glow */}
        {glow && (
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-amber-500/20 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* 3D Floating Element */}
        <div
          className={`relative overflow-hidden ${sizeClasses[size]} border border-emerald-400/40 shadow-lg bg-slate-950 transition-transform duration-200 ease-out`}
          style={{
            transform: interactive
              ? `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${rotateX !== 0 || rotateY !== 0 ? 1.05 : 1})`
              : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          <img
            src="/src/assets/images/skill_house_3d_logo_1790951708837.jpg"
            alt="Skill House Academy 3D Logo"
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Dynamic 3D Glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-bold text-base tracking-tight text-slate-900 flex items-center gap-1">
            <span>SKILL HOUSE</span>
            <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-100 px-1 rounded uppercase">3D</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono tracking-wider -mt-0.5">
            DIGITAL MARKETING ACADEMY
          </span>
        </div>
      )}
    </div>
  );
};
