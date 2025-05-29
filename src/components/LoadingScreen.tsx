import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GooeyText } from "./ui/gooey-text-morphing";
import React from "react";

const gradients = [
  "from-primary to-accent-cyan",
  "from-accent-cyan to-primary",
  "from-primary/80 to-accent-cyan/80",
  "from-accent-cyan/60 to-primary/60"
];

const circles = [
  { size: 320, x: -120, y: -80, delay: 0 },
  { size: 220, x: 180, y: -60, delay: 0.2 },
  { size: 180, x: -60, y: 180, delay: 0.4 },
  { size: 140, x: 120, y: 160, delay: 0.6 }
];

const morphTime = 1.1;
const cooldownTime = 0.7;

export default function LoadingScreen({ show }: { show: boolean }) {
  const [reveal, setReveal] = useState(false);
  const [curtain, setCurtain] = useState(false);

  // Trigger curtain on exit
  React.useEffect(() => {
    if (!show) {
      setCurtain(true);
      setTimeout(() => setCurtain(false), 900); // slightly longer than exit
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Parallax Circles/Blobs with more movement and smooth exit */}
          <AnimatePresence>
            {show && (
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                {circles.map((c, i) => (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} opacity-40 blur-2xl`}
                    style={{ width: c.size, height: c.size, left: `calc(50% + ${c.x}px)`, top: `calc(50% + ${c.y}px)`, zIndex: 1 }}
                    initial={{ scale: 0.7, opacity: 0.2, rotate: 0, filter: "blur(32px)" }}
                    animate={{ 
                      scale: [0.7, 1.1, 0.9, 1], 
                      opacity: [0.2, 0.4, 0.3, 0.4],
                      x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
                      y: [0, 20 * (i % 2 === 1 ? 1 : -1), 0],
                      rotate: [0, 15, -10, 0],
                      filter: ["blur(32px)", "blur(16px)", "blur(32px)"]
                    }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 * i }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Gooey Morphing Text - morphs through Welcome → to → easywebs, with smooth entrance/exit */}
          <AnimatePresence>
            {show && (
              <motion.div
                className="relative z-10 w-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -20 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <GooeyText
                  texts={["Welcome", "to", "easywebs"]}
                  morphTime={morphTime}
                  cooldownTime={cooldownTime}
                  className="w-full flex items-center justify-center"
                  textClassName="bg-gradient-to-r from-primary via-accent-cyan to-primary bg-clip-text text-transparent text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold px-4"
                />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Curtain Reveal Animation on exit */}
          <AnimatePresence>
            {curtain && (
              <>
                <motion.div
                  className="fixed top-0 left-0 h-full w-1/2 bg-background z-[100]"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  exit={{ scaleX: 0 }}
                  style={{ originX: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <motion.div
                  className="fixed top-0 right-0 h-full w-1/2 bg-background z-[100]"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  exit={{ scaleX: 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </>
            )}
          </AnimatePresence>
          {/* Wipe up reveal mask on exit (kept for fallback) */}
          <AnimatePresence>
            {!show && !curtain && (
              <motion.div
                className="absolute inset-0 z-50 bg-background"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 1.2, opacity: 0 }}
                style={{ originY: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}