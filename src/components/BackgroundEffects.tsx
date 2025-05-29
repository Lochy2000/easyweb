import { useEffect, useState } from "react";

export const BackgroundEffects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-[1] overflow-hidden pointer-events-none bg-background">
      {/* Enhanced Grid Pattern using new system */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Dynamic Color Overlays with Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent-cyan/3 animate-pulse-slow" />
      
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-pink/2 via-transparent to-primary/3" />

      {/* Subtle Vignette Effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, hsl(var(--background) / 0.8) 100%)'
        }}
      />

      {/* Additional atmospheric layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
    </div>
  );
}; 