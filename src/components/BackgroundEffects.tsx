import { motion } from "framer-motion";

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-[1] overflow-hidden pointer-events-none">
      {/* Dotted Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(168, 85, 247, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '-1px -1px'
        }}
      />

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.25, 0.15, 0.25],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-purple-500/25 via-purple-500/10 to-transparent blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.25, 0.15, 0.25],
          x: [0, -80, 0],
          y: [0, 70, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-violet-500/25 via-violet-500/10 to-transparent blur-[100px]"
      />

      {/* Very Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}
      />
    </div>
  );
}; 