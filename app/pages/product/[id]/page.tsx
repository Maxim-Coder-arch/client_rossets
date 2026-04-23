'use client';

import { useParams } from "next/navigation";
import { useState } from "react";
import { rossets } from "@/data/rossets.data";
import Image from "next/image";
import Link from "next/link";
import { seriesData } from "@/data/series.data";
import "./index.scss";
import TemplateCards from "@/app/share/templateCards/templateCard";
import SeriesCard from "@/app/share/series-card/seriesCard";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";

const Product = () => {
  const params = useParams();
  const product = rossets.find(item => item._id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Розетка не найдена</h1>
        <Link href="/catalog">Вернуться в каталог</Link>
      </div>
    );
  }
  const allImages = [product.image, ...(product.additionalImages || [])];
  const hasMultipleImages = allImages.length > 1;
  const otherSeries = seriesData.filter(series => series._id !== product.seriesId);
  const dataLogicMenu = [
    {
      label: "Главная",
      link: "/"
    },
    {
      label: "Вернуться к серии",
      link: `/pages/series/${product.seriesId}`
    },
    {
      label: "Контакты",
      link: "#contacts"
    }
  ]
  
  return (
    <>
    <LogicUniversalMenu data={dataLogicMenu} />
      <div className="product-page">
        <div className="product-page__container">
          <div className="product-page__gallery">
            <div className="product-page__gallery__main">
              <Image
                src={allImages[selectedImage]}
                alt={product.seriesNumber}
                width={600}
                height={600}
                priority
              />
            </div>
            

            {hasMultipleImages && (
              <div className="product-page__gallery__thumbs">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`product-page__gallery__thumbs__item ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <Image
                      src={img}
                      alt={`${product.seriesNumber} - вид ${idx + 1}`}
                      width={80}
                      height={80}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          

          <div className="product-page__info">
            <div className="product-page__info__header">
              <h1>{product.seriesNumber}</h1>
              <p className="series-name">Серия: {product.rossetSeries}</p>
            </div>
            
            <div className="product-page__info__characteristics">
              <h2>Характеристики</h2>
              <ul>
                <li>
                  <span>Номер розетки:</span>
                  <strong>{product.rossetNumber}</strong>
                </li>
                <li>
                  <span>Диаметр:</span>
                  <strong>{product.rossetDiameter} см</strong>
                </li>
                <li>
                  <span>Количество хвостов:</span>
                  <strong>{product.numberOfTails}</strong>
                </li>
                <li>
                  <span>Длина хвостов:</span>
                  <strong>{product.tailLength} см</strong>
                </li>
              </ul>
            </div>
            
            {product.comment && (
              <div className="product-page__info__comment">
                <h2>Описание</h2>
                <p>{product.comment}</p>
              </div>
            )}
            
            <div className="product-page__info__price">
              <div className="price">{product.price} ₽</div>
              <button className="order-button">Заказать</button>
            </div>
            
          </div>
        </div>
      </div>
      <div className="other-series">
        <div className="other-series__wrapper">
          <h5>Смотрите также</h5>
          <TemplateCards>
            {otherSeries.map((other, index) => {
              return <SeriesCard product={other} key={index} />
            })}
          </TemplateCards>
        </div>
      </div>
    </>
  );
};

export default Product;