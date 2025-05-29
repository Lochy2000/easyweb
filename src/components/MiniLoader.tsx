import { motion } from "framer-motion";

export default function MiniLoader() {
  return (
    <div className="flex items-center gap-3 p-4">
      <motion.div
        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-cyan opacity-60 blur-sm"
        initial={{ scale: 0.7, opacity: 0.3 }}
        animate={{ scale: [0.7, 1.1, 0.9, 1], opacity: [0.3, 0.6, 0.4, 0.6] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.span
        className="text-lg font-bold bg-gradient-to-r from-primary via-accent-cyan to-primary bg-clip-text text-transparent animate-shimmer"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.span>
      <style>{`
        .animate-shimmer {
          animation: shimmer 1.2s linear infinite;
          background-size: 200% auto;
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
} 