"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import "./index.scss";

const CookieMessage = () => {
  const [isCookieMessageOpen, setIsCookieMessageOpen] = useState(false);

  useEffect(() => {
    const hasConsent = Cookies.get("cookie_consent");
    
    if (!hasConsent) {
      const timeout = setTimeout(() => {
        setIsCookieMessageOpen(true);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 3 });
    setIsCookieMessageOpen(false);
  };

  if (!isCookieMessageOpen) return null;

  return (
    <div className="cookie-message">
      <motion.div 
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="cookie-message__block"
      >
        <p>Мы используем файлы cookie для улучшения работы нашего сайта</p>
        <button onClick={handleAccept}>Понятно</button>
      </motion.div>
    </div>
  );
};

export default CookieMessage;