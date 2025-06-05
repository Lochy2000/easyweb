"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 translate-y-8 sm:translate-y-12 md:translate-y-16 lg:translate-y-20 xl:translate-y-24">
        {/* Left Lamp Beam - Responsive */}
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "clamp(15rem, 30vw, 30rem)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-32 sm:h-44 md:h-56 overflow-visible w-[clamp(15rem,30vw,30rem)] bg-gradient-conic from-accent-cyan via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-background h-20 sm:h-32 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-20 sm:w-32 md:w-40 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Lamp Beam - Responsive */}
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "clamp(15rem, 30vw, 30rem)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-32 sm:h-44 md:h-56 w-[clamp(15rem,30vw,30rem)] bg-gradient-conic from-transparent via-transparent to-accent-cyan text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-20 sm:w-32 md:w-40 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-background h-20 sm:h-32 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        {/* Background blur elements - Responsive */}
        <div className="absolute top-1/2 h-32 sm:h-40 md:h-48 w-full translate-y-6 sm:translate-y-8 md:translate-y-12 scale-x-150 bg-background blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-32 sm:h-40 md:h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        
        {/* Central glow - Responsive */}
        <div className="absolute inset-auto z-50 h-24 sm:h-32 md:h-36 w-[clamp(20rem,50vw,28rem)] -translate-y-1/2 rounded-full bg-accent-cyan opacity-50 blur-3xl"></div>
        
        {/* Animated central beam - Original position */}
        <motion.div
          initial={{ width: "4rem" }}
          whileInView={{ width: "clamp(8rem, 20vw, 16rem)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-24 sm:h-32 md:h-36 w-[clamp(8rem,20vw,16rem)] -translate-y-[3rem] sm:-translate-y-[4rem] md:-translate-y-[6rem] rounded-full bg-accent-cyan blur-2xl"
        ></motion.div>
        
        {/* Lamp line - Hidden behind background */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "clamp(15rem, 30vw, 30rem)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[clamp(15rem,30vw,30rem)] -translate-y-[5rem] sm:-translate-y-[6rem] md:-translate-y-[7rem] bg-accent-cyan"
        ></motion.div>

        {/* Top mask - Responsive */}
        <div className="absolute inset-auto z-40 h-32 sm:h-40 md:h-44 w-full -translate-y-[8rem] sm:-translate-y-[10rem] md:-translate-y-[12.5rem] bg-background"></div>
      </div>

      {/* Content container - RESPONSIVE POSITIONING */}
      <div className="relative z-50 flex flex-col items-center px-4 sm:px-6 lg:px-5 w-full lamp-container-content" style={{ transform: 'translateY(-8rem)' }}>
        <style jsx>{`
          @media (max-width: 640px) {
            .lamp-container-content {
              transform: translateY(-6rem) !important;
            }
          }
          @media (min-width: 641px) and (max-width: 768px) {
            .lamp-container-content {
              transform: translateY(-8rem) !important;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .lamp-container-content {
              transform: translateY(-10rem) !important;
            }
          }
          @media (min-width: 1025px) and (max-width: 1280px) {
            .lamp-container-content {
              transform: translateY(-12rem) !important;
            }
          }
          @media (min-width: 1281px) {
            .lamp-container-content {
              transform: translateY(-14rem) !important;
            }
          }
        `}</style>
        {children}
      </div>
    </div>
  );
};
