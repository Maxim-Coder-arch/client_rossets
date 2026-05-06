"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkIcon from "@/public/icons/link";
import { motion } from "framer-motion";
import "./index.scss";

const Breadcrumbs = () => {
  const pathname = usePathname();
  
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(segment => segment && segment !== "pages");
    
    const crumbs = [{ label: "Главная", href: "/" }];
    
    if (segments.length === 0) return crumbs;
    
    crumbs.push({ label: "Каталог", href: "/pages/full-catalog" });
    
    if (segments[0] === "full-catalog") return crumbs;
    
    const prevSegment = segments.length > 1 ? segments[segments.length - 2] : null;
    
    if (prevSegment === "series") {
      crumbs.push({ label: "Серия", href: "#" });
    } else if (prevSegment === "product") {
      crumbs.push({ label: "Розетка", href: "#" });
    } else if (prevSegment === "decor") {
      crumbs.push({ label: "Декор", href: "#" });
    }
    
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="breadcrumbs">
      <motion.div 
      initial={{y: 100, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.5, delay: 1}}
      className="breadcrumbs__container">
        <Link className="breadcrumbs__container__logo" href="/">
          Vivid Ribbon
        </Link>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <span key={index} className="breadcrumbs__item">
              {!isLast && crumb.href !== "#" ? (
                <Link href={crumb.href} className="breadcrumbs__link">
                  {crumb.label}
                </Link>
              ) : (
                <span className="breadcrumbs__current">{crumb.label}</span>
              )}
            </span>
          );
        })}
        <div className="breadcrumbs__container__bid">
          <Link href="/#bid-form">
            <LinkIcon />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Breadcrumbs;