import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/types/product.type";
import "./index.scss";

const RossetCard = (props: IProduct) => {
  const {
    _id,
    image,
    rossetDiameter,
    numberOfTails,
    tailLength,
    price
  } = props;

  return (
    <div className="rosset-card">
      <div className="rosset-card__image">
        <Image
          src={image}
          alt="rosset"
          width={400}
          height={400}
        />
      </div>
      <div className="rosset-card__meta">
        <div className="rosset-card__meta__description">
          <p>Диаметр: {rossetDiameter}см</p>
          <p>Количество хвостов: {numberOfTails}</p>
          <p>Длина хвоста: {tailLength}см</p>
          <p>Цена: {price} руб.</p>
        </div>
        <div className="rosset-card__meta__footer">
          <Link href={`/pages/product/${_id}`}>Подробнее</Link>
        </div>
      </div>
    </div>
  )
}

export default RossetCard;