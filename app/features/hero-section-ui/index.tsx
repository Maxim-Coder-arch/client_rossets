"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import ModalDetail from "@/app/share/modal-details/modalDetail";
import LinkIcon from "@/public/icons/link";
import { IHeroSetionProps } from "@/types/heroSectionUi.type";

const HeroSectionUi = ({ setIsModalOpen, isModalOpen }: IHeroSetionProps) => {
  const [showContent, setShowContent] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section id="hero-section" className="hero-split hero-split--light">
        <div className="hero-split__container">
          <motion.div 
            className="hero-split__content"
            initial={{ opacity: 0, x: -80 }}
            animate={showContent ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
          >
            <div className="hero-split__badge">
              <span>Премиум награды</span>
            </div>
            
            <h1 className="hero-split__title">
              Наградные <span className="highlight">розетки</span>
              <br />
              высшего класса
            </h1>
            
            <div className="hero-split__underline">
              <motion.div 
                className="hero-split__underline__line"
                initial={{ width: 0 }}
                animate={showContent ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
              />
            </div>
            
            <div className="hero-split__features">
              <div className="feature-item">
                <span>100+ цветов ленты</span>
              </div>
              <div className="feature-item">
                <span>Срочно от 5 дней</span>
              </div>
              <div className="feature-item">
                <span>Скидки от 200 шт</span>
              </div>
              <div className="feature-item">
                <span>Любой декор</span>
              </div>
            </div>
            
            <motion.div 
              className="hero-split__actions"
              initial={{ opacity: 0, y: 30 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <Link href="/pages/full-catalog" className="btn-secondary">
                Смотреть каталог
                <LinkIcon />
              </Link>
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                Подробнее
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-split__image"
            initial={{ opacity: 0, x: 80 }}
            animate={showContent ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
          >
            <div className="hero-split__image__wrapper">
              <motion.img 
                src="/hero-section/9W_QSCgNoAha34mEU5bQLKy3k1QZl40WYE8cwJvraHUgpptqieemLzw4iIoQ5v8XTUvybELz.jpg" 
                alt="Наградные розетки премиум класса" 
                className="hero-split__image__img"
                style={{ y: y1 }}
              />
              <div className="hero-split__image__overlay"></div>
              <div className="hero-split__image__badge">
                <span>Vivid Ribbon Award</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="hero-split__transition"></div>
      </section>
      
      {isModalOpen && <ModalDetail onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default HeroSectionUi;