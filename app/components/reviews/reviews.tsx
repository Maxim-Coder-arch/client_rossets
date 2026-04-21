"use client";

import { useState } from "react";
import UserIcon from "@/public/icons/user";
import "./index.scss";
import ArrowLeftIcon from "@/public/icons/arrowLeft";
import ArrowRightIcon from "@/public/icons/arrowRight";

const allReviews = [
  {
    name: "Анна",
    text: `"Любимая розетка в серии «Енисей». Легко и просто в духе. Не требует особого усилия и не занимает много места. Очень любимая розетка в серии «Котик»."`,
    rating: 5
  },
  {
    name: "Дмитрий",
    text: `"Заказывали розетки для выставки собак. Всё сделали в срок, качество отличное. Отдельное спасибо за помощь с дизайном!"`,
    rating: 5
  },
  {
    name: "Елена",
    text: `"Срочный заказ за 5 дней — реально! Спасли наше мероприятие. Розетки выглядят дорого и престижно."`,
    rating: 5
  },
  {
    name: "Михаил",
    text: `"Большой выбор цветов ленты. Сделали индивидуальные серединки с логотипом. Клиенты довольны."`,
    rating: 4
  },
  {
    name: "Ольга",
    text: `"Отличное качество. Розетки плотные, лента не сыпется. Заказывали 200 штук — получили скидку. Рекомендую!"`,
    rating: 5
  },
  {
    name: "Сергей",
    text: `"Уже третий раз заказываю. Всегда в срок, цвета точно как на фото. Удобно, что можно скачать полный каталог PDF."`,
    rating: 5
  },
  {
    name: "Татьяна",
    text: `"Детская серия «Котик» — хит! Дети в восторге. Спасибо за качество и внимание к деталям."`,
    rating: 5
  },
  {
    name: "Анна",
    text: `"Любимая розетка в серии «Енисей». Легко и просто в духе. Не требует особого усилия и не занимает много места. Очень любимая розетка в серии «Котик»."`,
    rating: 5
  },
  {
    name: "Дмитрий",
    text: `"Заказывали розетки для выставки собак. Всё сделали в срок, качество отличное. Отдельное спасибо за помощь с дизайном!"`,
    rating: 5
  },
  {
    name: "Елена",
    text: `"Срочный заказ за 5 дней — реально! Спасли наше мероприятие. Розетки выглядят дорого и престижно."`,
    rating: 5
  },
  {
    name: "Михаил",
    text: `"Большой выбор цветов ленты. Сделали индивидуальные серединки с логотипом. Клиенты довольны."`,
    rating: 4
  },
  {
    name: "Ольга",
    text: `"Отличное качество. Розетки плотные, лента не сыпется. Заказывали 200 штук — получили скидку. Рекомендую!"`,
    rating: 5
  },
  {
    name: "Сергей",
    text: `"Уже третий раз заказываю. Всегда в срок, цвета точно как на фото. Удобно, что можно скачать полный каталог PDF."`,
    rating: 5
  },
  {
    name: "Татьяна",
    text: `"Детская серия «Котик» — хит! Дети в восторге. Спасибо за качество и внимание к деталям."`,
    rating: 5
  },
];

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  
  const startIndex = currentPage * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = allReviews.slice(startIndex, endIndex);
  
  const goToNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="reviews">
      <div className="reviews">
        <div className="reviews__title">
          <h2>Отзывы</h2>
          <p>Нас рекомендуют</p>
        </div>
      </div>
      
      <div className="reviews__content">
        {currentReviews.map((review, index) => (
          <div className="reviews__content__item" key={`${startIndex + index}`}>
            <div className="reviews__content__item__header">
              <div className="reviews__content__item__header__image">
                <UserIcon />
              </div>
              <div className="reviews__content__item__header__name">{review.name}</div>
              <div className="reviews__content__item__header__rating">{review.rating.toFixed(1)}</div>
            </div>
            <div className="reviews__content__item__text">{review.text}</div>
          </div>
        ))}
      </div>
      <div className="reviews__navigation">
        <div className="reviews__navigation__template">
          <div className="reviews__navigation__dots">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={idx}
                className={`reviews__navigation__dot ${currentPage === idx ? "active" : ""}`}
                onClick={() => goToPage(idx)}
              >
              </div>
            ))}
          </div>
          <div className="reviews__navigation__buttons">
            <button 
              className="reviews__navigation__prev" 
              onClick={goToPrev}
              disabled={currentPage === 0}
            >
              <ArrowLeftIcon />
            </button>
            
            <button 
              className="reviews__navigation__next" 
              onClick={goToNext}
              disabled={currentPage === totalPages - 1}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;


