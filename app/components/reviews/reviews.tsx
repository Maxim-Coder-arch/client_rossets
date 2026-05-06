"use client";

import { IReview } from "@/types/reviews.type";
import { useState, useEffect } from "react";
import ReviewsSectionUi from "@/app/features/reviews-section-ui";
import "./index.scss";

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
  
  return <ReviewsSectionUi 
  handleTouchStart={handleTouchStart} 
  handleTouchMove={handleTouchMove} 
  handleTouchEnd={handleTouchEnd} 
  goToNext={goToNext} 
  goToPrev={goToPrev} 
  goToPage={goToPage} 
  currentIndex={currentIndex} 
  totalPages={totalPages} 
  currentReviews={currentReviews} />
};

export default Reviews;