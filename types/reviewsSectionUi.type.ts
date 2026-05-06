import { IReview } from "./reviews.type";

export interface IReviewsSectionUiProps {
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