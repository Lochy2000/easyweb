import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, 
            hsl(var(--primary) / 0) 0%, 
            hsl(var(--primary) / 0.8) 25%, 
            hsl(var(--primary) / 0.1) 50%, 
            hsl(var(--primary) / 0) 100%)`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% center", "-200% center"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}; 