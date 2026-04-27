import Image from "next/image";
import Link from "next/link";
import "./index.scss";

const SeriesCard = ({ product }) => {
  return (
    <div className="series-card">
      <div className="series-card__image">
        <Image 
          src={product.image} 
          alt={product.seriesTitle} 
          width={400} 
          height={400} 
        />
      </div>
      <div className="series-card__content">
        <h3 className="series-card__title">{product.seriesTitle}</h3>
        <Link href={`/pages/series/${product.seriesId}`} className="series-card__link">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default SeriesCard;