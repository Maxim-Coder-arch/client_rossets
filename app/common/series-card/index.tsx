import Link from "next/link";
import Image from "next/image";
import { ISeries } from "@/types/series.type";
import "./index.scss";
import ArrowRightIcon from "@/public/icons/arrowRight";

const SeriesCard = ({ product }: { product: ISeries }) => {
  return (
    <Link href={`/pages/series/${product.seriesId}`} className="link-card">
      <div className="series-card">
        <div className="series-card__wrapper">
          <p>Серия</p>
          <div className="series-card__wrapper__image">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.seriesTitle}
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="series-card__footer">
          <h3>{product.seriesTitle}</h3>
          <ArrowRightIcon />
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;







// <div className="series-card">
    //   <div className="series-card__image">
    //     <Image
    //       src={product.image || "/placeholder.jpg"}
    //       alt={product.seriesTitle}
    //       width={400}
    //       height={400}
    //     />
    //   </div>

    //   <div className="series-card__content">
    //     <h3 className="series-card__title">{product.seriesTitle}</h3>

    //     <Link
    //       href={`/pages/series/${product.seriesId}`}
    //       className="series-card__link"
    //     >
    //       Подробнее
    //     </Link>
    //   </div>
    // </div>