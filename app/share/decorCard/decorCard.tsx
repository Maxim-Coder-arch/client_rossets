import Image from "next/image";
import Link from "next/link";
import { IDecor } from "@/types/decor.type";
import "./index.scss";
import LinkIcon from "@/public/icons/link";

const DecorCard = ({ decor }: { decor: IDecor }) => {
  return (
    <Link href={`/pages/decor/${decor._id}`} className="vivid-decor-card-wrapper">
      <div className="vivid-decor-card">
        <div className="vivid-decor-card__media">
          <Image
            src={decor.mainImage || "/placeholder.jpg"}
            alt={decor.title}
            fill
            className="vivid-decor-card__image"
          />
          <div className="vivid-decor-card__overlay"></div>
        </div>
        <div className="vivid-decor-card__info">
          <h3 className="vivid-decor-card__title">{decor.title}</h3>
          <LinkIcon />
        </div>
      </div>
    </Link>
  );
};

export default DecorCard;