'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TemplateCards from "@/app/share/templateCards/templateCard";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";
import ModalOrderProduct from "@/app/share/modal-order-products/modalOrderProduct";
import { IProduct } from "@/types/product.type";
import "./index.scss";
import { ISeries } from "@/types/series.type";
import SeriesCardDesign from "@/app/common/seriesCardDesign/seriesCardDesign";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpenModalOrderProducts, setIsOpenModalOrderProducts] = useState(false);
  const [series, setSeries] = useState<ISeries[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);
        
        if (!res.ok) {
          throw new Error("Розетка не найдена");
        }
        
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch("/api/series");
        const data = await res.json();
        setSeries(data.series || []);
      } catch (err) {
        console.error("Ошибка загрузки серий:", err);
      }
    };

    fetchSeries();
  }, []);

  if (loading) {
    return (
      <>
        <LogicUniversalMenu data={[{ label: "Главная", link: "/" }, { label: "Контакты", link: "#contacts" }]} />
        <div className="product-page">
          <div className="product-page__container">
            <div className="loading-spinner">Загрузка...</div>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <LogicUniversalMenu data={[{ label: "Главная", link: "/" }, { label: "Контакты", link: "#contacts" }]} />
        <div className="product-not-found">
          <h1>{error || "Розетка не найдена"}</h1>
          <Link href="/pages/full-catalog">Вернуться в каталог</Link>
        </div>
      </>
    );
  }

  const allImages = [product.image, ...(product.additionalImages || [])];
  const hasMultipleImages = allImages.length > 1;
  const otherSeries = series.filter(
    (s) => String(s.seriesId) !== String(product.seriesId)
  );
  
  const dataLogicMenu = [
    { label: "Главная", link: "/" },
    { label: "Вернуться к серии", link: `/pages/series/${product.seriesId}` },
    { label: "Контакты", link: "#contacts" }
  ];
  
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
            
            {product.comment && (
              <div className="product-page__info__comment">
                <h2>Описание</h2>
                <p>{product.comment}</p>
              </div>
            )}
            
            <div className="product-page__info__price">
              <div className="price">{product.price} ₽</div>
              <button className="order-button" onClick={() => setIsOpenModalOrderProducts(true)}>Заказать</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="other-series">
        <div className="other-series__wrapper">
          <h5>Смотрите также</h5>
          <TemplateCards>
            {otherSeries.map((other) => (
              <SeriesCardDesign product={other} key={other._id} />
            ))}
          </TemplateCards>
        </div>
      </div>
      {isOpenModalOrderProducts && <ModalOrderProduct
        product={product} 
        onClose={() => setIsOpenModalOrderProducts(false)} 
      />}
    </>
  );
};

export default ProductPage;