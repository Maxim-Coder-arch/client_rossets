import Link from "next/link";
import "./index.scss";
import Image from "next/image";

// {
//     _id: "21",
//     image: "https://sun9-77.userapi.com/s/v1/ig2/O5kQpKcLUYNMh0fR7wbqBWCeczgrpucPVKXhh2SkEti5FGEOKd0bMRYg2bYdtSsHyyNarA2_WhqoEenIkOE-7s6M.jpg?quality=96&as=32x43,48x64,72x96,108x144,160x214,240x321,360x482,480x642,540x722,640x856,720x963,1080x1445,1196x1600&from=bu&u=8opaSEeZIj_he2TroqxYD-TQa9nhGmgzf1KZmXkuc0s&cs=1080x0",
//     additionalImages: [],
//     seriesId: "5",
//     seriesNumber: "ER_13/5",
//     rossetSeries: "ER_13",
//     rossetNumber: 5,
//     rossetDiameter: 15,
//     numberOfTails: 5,
//     tailLength: 40,
//     comment: "Трёхрядная розетка",
//     price: 193
//   },

interface IRossetCard {
  _id: string;
  image: string;
  additionalImages: string[];
  seriesId: string;
  seriesNumber: string;
  rossetSeries: string;
  rossetNumber: number;
  rossetDiameter: number;
  numberOfTails: number;
  tailLength: number;
  comment: string;
  price: number;
}

const RossetCard = (props: IRossetCard) => {
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