import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export const TextReveal = ({ text, delay = 0, className = "" }: TextRevealProps) => {
  const controls = useAnimation();
  const baseText = text.split("");

  useEffect(() => {
    const startAnimation = async () => {
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      await controls.start({ opacity: 1, y: 0 });
    };
    
    startAnimation();
  }, [controls, delay]);

  return (
    <span className={`inline-flex ${className}`}>
      {baseText.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}; 