import ArrowLeftIcon from "@/public/icons/arrowLeft"
import ArrowRightIcon from "@/public/icons/arrowRight"
import UserIcon from "@/public/icons/user"
import { IReview } from "@/types/reviews.type";

interface IReviewsSectionUiProps {
  handleTouchStart: React.TouchEventHandler<HTMLDivElement>;
  handleTouchMove: React.TouchEventHandler<HTMLDivElement>;
  handleTouchEnd: React.TouchEventHandler<HTMLDivElement>;
  goToNext: () => void;
  goToPrev: () => void;
  goToPage: (idx: number) => void;
  currentIndex: number;
  totalPages: number;
  currentReviews: IReview[];
}

const ReviewsSectionUi = ({ 
  handleTouchStart, 
  handleTouchMove, 
  handleTouchEnd, 
  goToNext, 
  goToPrev, 
  goToPage, 
  currentIndex, 
  totalPages, 
  currentReviews
 }: IReviewsSectionUiProps) => {
  return (
    <section id="reviews">
      <div className="reviews">
        <div className="reviews__content">
          <div className="reviews__content__header">
            <span>Имя пользователя</span>
            <span>Рейтинг</span>
          </div>
          {currentReviews.map(review => {
            return (
              <div className="reviews__content__item" 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              key={review._id}>
                <div className="reviews__content__item_meta">
                  <div className="reviews__content__item__user">
                    <UserIcon />
                  </div>
                  <div className="reviews__content__item__userreview">
                    <p>{review.name}</p>
                    <span>{review.text}</span>
                  </div>
                </div>
                <div className="reviews__content__item__rating">
                  <span>{review.rating}</span>
                </div>
              </div>
            )
          })}
        {totalPages > 1 && <div className="reviews__navigation">
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
        </div>}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSectionUi;











// <section id="reviews">
    //   <div className="reviews">
    //     <div className="reviews__title">
    //       <h2>Отзывы</h2>
    //       <p>Нас рекомендуют</p>
    //     </div>
    //   </div>
      
    //   <div 
    //     className="reviews__slider-container"
    //     onTouchStart={handleTouchStart}
    //     onTouchMove={handleTouchMove}
    //     onTouchEnd={handleTouchEnd}
    //   >
    //     <div className="reviews__content">
    //       {currentReviews.map(review => (
    //         <div className="reviews__content__item" key={review._id}>
    //           <div className="reviews__content__item__header">
    //             <div className="reviews__content__item__header__image">
    //               <UserIcon />
    //             </div>
    //             <div className="reviews__content__item__header__name">{review.name}</div>
    //             <div className="reviews__content__item__header__rating">
    //               {"★".repeat(review.rating)}
    //               {"☆".repeat(5 - review.rating)}
    //             </div>
    //           </div>
    //           <div className="reviews__content__item__text">{review.text}</div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
      
    //   {totalPages > 1 && (
    //     <div className="reviews__navigation">
    //       <div className="reviews__navigation__template">
    //         <div className="reviews__navigation__dots">
    //           {Array.from({ length: totalPages }).map((_, idx) => (
    //             <div
    //               key={idx}
    //               className={`reviews__navigation__dot ${currentIndex === idx ? "active" : ""}`}
    //               onClick={() => goToPage(idx)}
    //             />
    //           ))}
    //         </div>
    //         <div className="reviews__navigation__buttons">
    //           <button 
    //             className="reviews__navigation__prev" 
    //             onClick={goToPrev}
    //             disabled={currentIndex === 0}
    //           >
    //             <ArrowLeftIcon />
    //           </button>
    //           <button 
    //             className="reviews__navigation__next" 
    //             onClick={goToNext}
    //             disabled={currentIndex === totalPages - 1}
    //           >
    //             <ArrowRightIcon />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </section>