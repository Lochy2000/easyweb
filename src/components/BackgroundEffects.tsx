import { useEffect, useState } from "react";

export const BackgroundEffects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-[1] overflow-hidden pointer-events-none bg-[#0d0b1a]">
      {/* Horizontal Grid Lines */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-[1px] bg-white/20"
            style={{
              top: `${(i + 1) * 4}%`,
              animation: `pulseOpacity ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Vertical Grid Lines */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-[1px] bg-white/20"
            style={{
              left: `${(i + 1) * 4}%`,
              animation: `pulseOpacity ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Subtle Vignette Effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.7) 100%)'
        }}
      />

      {/* Add the animation keyframes via style tag */}
      <style>
        {`
          @keyframes pulseOpacity {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
}; 