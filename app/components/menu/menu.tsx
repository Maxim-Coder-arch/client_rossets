'use client';

import { dataMenu } from "@/data/menu.data";
import { motion, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import "./index.scss";

const Menu = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.scrollWidth / 2;
    const animateX = animate(baseX, -containerWidth, {
      duration: 50,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    });
    
    return () => animateX.stop();
  }, [baseX]);

  return (
    <nav className="navigation">
      <div className="navigation__banner">
        <div className="full-calalog__content__banner">
          <motion.div 
            ref={containerRef}
            className="full-calalog__content__banner__track"
            style={{ x: baseX }}
          >
            {Array.from({ length: 14 }).map((_, index) => (
              <div key={index} className="full-calalog__content__banner__label">
                Vivid Ribbon Awards - Наградные розетки
              </div>
            ))}
            {Array.from({ length: 14 }).map((_, index) => (
              <div key={`dup-${index}`} className="full-calalog__content__banner__label">
                Vivid Ribbon Awards - наградные розетки
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Основное меню */}
      <div className="menu">
        <div className="menu__logotype">
          Vivid Ribbon
        </div>
        <div className="menu__content">
          <ul className="menu__content__items">
            {dataMenu.map((item, index) => (
              <a className="menu__item" key={index} href={item.link}>
                <li>{item.label}</li>
              </a>
            ))}
          </ul>
          <div className="menu__separator"></div>
          <div className="menu__target">
            <button>Связаться с нами</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;