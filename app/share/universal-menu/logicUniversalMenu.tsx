"use client";
import { useEffect, useState } from "react";
import UniversalMenu from "./universalMenu";
import UniversalMobileMenu from "./universalMobileMenu";

interface ILogicUniversalMenu {
  label: string;
  link: string;
}
const LogicUniversalMenu = ({ data }: LogicUniversalMenuProps) => {
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

  return isMobile ? <UniversalMobileMenu data={data} /> : <UniversalMenu data={data} />;;
}

export default LogicUniversalMenu;