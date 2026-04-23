'use client';

import Link from "next/link";
import { useState } from "react";
import ModalDetail from "@/app/share/modal-details/modalDetail";
import "./index.scss";

const data = [
  {
    title: "100+ оттенков ленты",
    description: "Любые цвета под ваш бренд."
  },
  {
    title: "Срочное изготовление",
    description: "От 5 рабочих дней. Стандартный заказ — до 8 недель"
  },
  {
    title: "Скидки от объёма",
    description: "От 200 шт — 1₽/шт, от 500 шт — 2₽/шт, от 1000 шт — 3₽/шт."
  },
  {
    title: "Любой декор",
    description: "Розочки, стразы, кисти, тиснение фольгой, полноцветные значки."
  },
];


const HeroSection = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="hero-section">
        <div className="hero-section">
          <div className="hero-section__content template">
            <div className="hero-section__content__area">
              <p>Скидки от 200 штук. Работаем по всей России.</p>
              <h1>Наградные розетки высшего класса</h1>
              <span>Более 100 цветов атласной ленты. Индивидуальный дизайн. Срочное изготовление от 5 дней.</span>
              <div className="hero-section__content__area__target-actions">
                <Link 
                href="/pages/full-catalog"
                className="hero-section__content__area__target-actions__look-catalog-up">Смотреть каталог</Link>
                <button className="hero-section__content__area__target-actions__relations">Связаться с нами</button>
              </div>
            </div>
          </div>
          <div className="hero-section__image template">
            <div className="hero-section__image__wrapper"></div>
          </div>
          <div className="hero-section__bottom-wrapper">
            <div className="hero-section__bottom-wrapper__points">
              {data.map((item, index) => {
                return (
                  <div 
                  key={index}
                  className="hero-section__bottom-wrapper__points__item">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                )
              })}
              <button onClick={() => setIsModalOpen(true)}>Узнать детали</button>
            </div>
          </div>
        </div>
        <div className="hero-section-footer"></div>
      </section>
      {isModalOpen && <ModalDetail onClose={() =>setIsModalOpen(false)} />}
    </>
  )
}

export default HeroSection;