// MarqueeText.tsx

import React from 'react';
import { motion } from 'framer-motion';

const services = [
  'websites',
  'e-commerce',
  'onepages',
  'blogs',
  'portfolios',
  'dashboards',
  'mobile apps',
  'desktop apps',
];

// Rotating colors for "we dev"
const getColor = (index: number) => {
  const colors = ['#ff61dc', '#61efff', '#ffe761', '#b3ff61'];
  return colors[index % colors.length];
};

export const MarqueeText = () => {
  return (
    <div className="relative mt-0 sm:mt-2 md:mt-4 lg:mt-6">
      {/* First marquee - top (front) */}
      <div className="w-screen absolute left-[50%] right-[50%] -mx-[50vw] overflow-hidden h-[70px] sm:h-[85px] -rotate-[4deg] translate-y-0 opacity-95 z-20 backdrop-blur-sm bg-gradient-to-r from-black/40 via-black/30 to-black/40">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        <motion.div
          className="flex whitespace-nowrap relative z-20 h-full items-center justify-center"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 80,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{ minWidth: '200vw' }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={`top-${i}`} className="flex items-center justify-center h-full">
              {services.map((service, idx) => (
                <React.Fragment key={`top-${service}-${i}-${idx}`}>
                  <div className="flex items-center mx-3 sm:mx-5">
                    <span
                      className="font-semibold text-lg sm:text-xl md:text-2xl tracking-wide"
                      style={{ color: getColor(idx) }}
                    >
                      we dev
                    </span>
                    <span className="text-white text-lg sm:text-xl md:text-2xl ml-2 opacity-90">
                      {service}
                    </span>
                  </div>
                  {idx < services.length - 1 && (
                    <span className="text-gray-500 mx-1 sm:mx-2 text-base sm:text-xl">-</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Second marquee - bottom (back, blurred) */}
      <div className="w-screen absolute left-[50%] right-[50%] -mx-[50vw] overflow-hidden h-[70px] sm:h-[85px] rotate-[4deg] translate-y-[45px] sm:translate-y-[65px] opacity-60 z-10 backdrop-blur-sm bg-gradient-to-r from-black/30 via-black/20 to-black/30">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        <motion.div
          className="flex whitespace-nowrap relative z-20 h-full items-center justify-center"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 90,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{ minWidth: '200vw' }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={`bottom-${i}`} className="flex items-center justify-center h-full">
              {services.map((service, idx) => (
                <React.Fragment key={`bottom-${service}-${i}-${idx}`}>
                  <div className="flex items-center mx-3 sm:mx-5 blur-[2px]">
                    <span
                      className="font-semibold text-lg sm:text-xl md:text-2xl tracking-wide"
                      style={{ color: getColor((idx + 2) % 4) }}
                    >
                      we dev
                    </span>
                    <span className="text-white text-lg sm:text-xl md:text-2xl ml-2 opacity-70">
                      {service}
                    </span>
                  </div>
                  {idx < services.length - 1 && (
                    <span className="text-gray-500 mx-1 sm:mx-2 text-base sm:text-xl">-</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Empty spacer to create room for the two absolute-positioned marquees */}
      <div className="h-[130px] sm:h-[180px]"></div>
    </div>
  );
};
