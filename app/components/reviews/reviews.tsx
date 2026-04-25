"use client";

import { useState, useEffect } from "react";
import UserIcon from "@/public/icons/user";
import ArrowLeftIcon from "@/public/icons/arrowLeft";
import ArrowRightIcon from "@/public/icons/arrowRight";
import "./index.scss";

interface IReview {
  _id: string;
  name: string;
  text: string;
  rating: number;
  createdAt: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [reviewsPerView, setReviewsPerView] = useState(3);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Ошибка загрузки отзывов:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setReviewsPerView(2);
      } else {
        setReviewsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    setCurrentIndex(0);
  }, [reviewsPerView]);
  
  if (loading) {
    return (
      <section id="reviews">
        <div className="reviews">
          <div className="reviews__title">
            <h2>Отзывы</h2>
            <p>Нас рекомендуют</p>
          </div>
        </div>
        <div className="reviews__loading">Загрузка отзывов...</div>
      </section>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <section id="reviews">
        <div className="reviews">
          <div className="reviews__title">
            <h2>Отзывы</h2>
            <p>Нас рекомендуют</p>
          </div>
        </div>
        <div className="reviews__empty">Пока нет отзывов. Будьте первым!</div>
      </section>
    );
  }
  
  const totalPages = Math.ceil(reviews.length / reviewsPerView);
  const startIndex = currentIndex * reviewsPerView;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerView);
  
  const goToNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const goToPage = (page: number) => {
    setCurrentIndex(page);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      goToNext();
    }
    
    if (isRightSwipe) {
      goToPrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  return (
    <section id="reviews">
      <div className="reviews">
        <div className="reviews__title">
          <h2>Отзывы</h2>
          <p>Нас рекомендуют</p>
        </div>
      </div>
      
      <div 
        className="reviews__slider-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="reviews__content">
          {currentReviews.map((review, index) => (
            <div className="reviews__content__item" key={review._id}>
              <div className="reviews__content__item__header">
                <div className="reviews__content__item__header__image">
                  <UserIcon />
                </div>
                <div className="reviews__content__item__header__name">{review.name}</div>
                <div className="reviews__content__item__header__rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <div className="reviews__content__item__text">{review.text}</div>
            </div>
          ))}
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="reviews__navigation">
          <div className="reviews__navigation__template">
            <div className="reviews__navigation__dots">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  className={`reviews__navigation__dot ${currentIndex === idx ? "active" : ""}`}
                  onClick={() => goToPage(idx)}
                />
              ))}
            </div>
            <div className="reviews__navigation__buttons">
              <button 
                className="reviews__navigation__prev" 
                onClick={goToPrev}
                disabled={currentIndex === 0}
              >
                <ArrowLeftIcon />
              </button>
              <button 
                className="reviews__navigation__next" 
                onClick={goToNext}
                disabled={currentIndex === totalPages - 1}
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;