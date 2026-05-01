"use client";

import ModalDetail from "@/app/share/modal-details/modalDetail";
import LinkIcon from "@/public/icons/link";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IHeroUiDataProps {
  title: string;
  description: string;
}

interface IHeroSetionProps {
  data: IHeroUiDataProps[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const HeroSectionUi = ({ data, setIsModalOpen, isModalOpen }: IHeroSetionProps) => {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const fullText = "Vivid Ribbon Award".split("");

  return (
    <>
      <section id="hero-section">
        <div className="hero-section">
          <div className="hero-section__content">
            <div className="hero-section__content__header">
              <motion.span
                initial={{ opacity: 0, y: -100 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                Более 100 цветов атласной ленты. Индивидуальный дизайн. Срочное изготовление от 5 дней.
              </motion.span>
              
              <div className="hero-section__content__header__links">
                <motion.div 
                  initial={{ opacity: 0, y: -100 }}
                  animate={showContent ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="hero-section__content__header__links__order"
                >
                  <Link href="#">Заказ</Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={showContent ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="hero-section__content__header__links__relations"
                >
                  <Link href="#">Полный каталог</Link>
                  <LinkIcon />
                </motion.div>
              </div>
              
              <motion.button 
                initial={{ opacity: 0, y: -100 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => setIsModalOpen(true)}
              >
                Открыть подробности
              </motion.button>
            </div>
            
            <div className="hero-section__content__points">
              {data.map((item, index) => (
                <motion.div 
                  key={index}
                  className="hero-section__content__points__point"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={showContent ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <span>{item.description}</span>
                  <h2>{item.title}</h2>
                </motion.div>
              ))}
            </div>
            
            <div className="hero-section__content__company-name">
              <h1 className="typing-title">
                {fullText.map((letter, index) => (
                  <motion.strong 
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={showContent ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.03 }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.strong>
                ))}
              </h1>
              <motion.span
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Наградные розетки <strong>высшего класса</strong>
              </motion.span>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && <ModalDetail onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default HeroSectionUi;