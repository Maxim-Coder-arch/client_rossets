"use client";
import { useEffect, useState } from "react";
import UniversalMenu from "./universalMenu";
import UniversalMobileMenu from "./universalMobileMenu";

interface ILogicUniversalMenu {
  label: string;
  link: string;
}
const LogicUniversalMenu = ({ data }: { data: ILogicUniversalMenu[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return isMobile ? <UniversalMobileMenu data={data} /> : <UniversalMenu data={data} />;;
}

export default LogicUniversalMenu;