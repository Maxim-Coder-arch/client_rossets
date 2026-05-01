'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import "./index.scss";

const LoaderComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  useLayoutEffect(() => {
    setIsLoading(true);
  }, [pathname]);

  useEffect(() => {
    if (!isLoading) return;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading, pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div 
          className="loader-component"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="loader-component__block-1">
            {Array.from({length: 5}).map((_, index) => (
              <motion.div 
                key={index}
                className="loader-component__item-variation-1"
                initial={{ height: 0 }}
                animate={{ 
                  height: ["0%", "100%", "100%", "0%"],
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  times: [0, 0.4, 0.6, 1],
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <div className="loader-component__block-2">
            {Array.from({length: 5}).map((_, index) => (
              <motion.div 
                key={index}
                className="loader-component__item-variation-2"
                initial={{ height: 0 }}
                animate={{ 
                  height: ["0%", "100%", "100%", "0%"],
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  times: [0, 0.4, 0.6, 1],
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderComponent;