'use client';

import Menu from "./menu"
import MobileMenu from "./mobile";
import { useState, useEffect } from "react";

const LogicMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreen();
    
    window.addEventListener("resize", checkScreen);
    
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  if (!isMounted) {
    return null;
  }

  return isMobile ? <MobileMenu /> : <Menu />;
}

export default LogicMenu;