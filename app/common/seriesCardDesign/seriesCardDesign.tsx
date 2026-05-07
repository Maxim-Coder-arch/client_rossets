import ArrowRightIcon from "@/public/icons/arrowRight";
import Link from "next/link";
import Image from "next/image";
import { ISeries } from "@/types/series.type";
import "./index.scss";

export const SeriesCardDesign = ({ product }: { product: ISeries }) => {
  return (
    <Link href={`/pages/series/${product.seriesId}`} className="link-series-card">
      <div className="series-card-design">
        <div className="series-card-design__image">
          <div className="series-card-design__image__wrapper">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.seriesTitle}
              width={400}
              height={400}
            />
          </div>
          <span>Серия</span>
        </div>
        <div className="series-card-design__series-name">
          <h3>{product.seriesTitle}</h3>
          <ArrowRightIcon />
        </div>
      </div>
    </Link>
  )
}

export default SeriesCardDesign;