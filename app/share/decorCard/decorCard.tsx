import Image from "next/image";
import Link from "next/link";
import { IDecor } from "@/types/decor.type";
import "./index.scss";

const DecorCard = ({ decor }: {decor: IDecor}) => {
  return (
    <div className="decor-card">
      <div className="decor-card__image">
        <Image
          src={decor.mainImage || "/placeholder.jpg"}
          alt={decor.title}
          width={400}
          height={400}
        />
      </div>
      <div className="decor-card__content">
        <h3 className="decor-card__title">{decor.title}</h3>

        <Link
          href={`/pages/decor/${decor._id}`}
          className="decor-card__link"
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}

export default DecorCard;