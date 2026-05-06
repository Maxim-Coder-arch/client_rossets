"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";
import ModalOrderDecor from "@/app/share/modal-order-decor/modalOrderDecor";
import { IDecor } from "@/types/decor.type";
import "./index.scss";

const DecorPage = () => {
  const params = useParams();
  const [decor, setDecor] = useState<IDecor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  useEffect(() => {
    const fetchDecor = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/decors/${params.id}`);
        
        if (!res.ok) {
          throw new Error("Декор не найден");
        }
        
        const data = await res.json();
        setDecor(data.decor || data);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchDecor();
    }
  }, [params.id]);

  const dataLogicMenu = [
    { label: "Главная", link: "/" },
    { label: "Каталог", link: "/pages/full-catalog" },
    { label: "Контакты", link: "#contacts" },
  ];

  if (loading) {
    return (
      <>
        <LogicUniversalMenu data={dataLogicMenu} />
        <div className="decor-page">
          <div className="decor-page__loading">Загрузка...</div>
        </div>
      </>
    );
  }

  if (error || !decor) {
    return (
      <>
        <LogicUniversalMenu data={dataLogicMenu} />
        <div className="decor-page">
          <div className="decor-page__error">
            <h1>{error || "Декор не найден"}</h1>
            <Link href="/pages/full-catalog">Вернуться в каталог</Link>
          </div>
        </div>
      </>
    );
  }
  const allImages = [decor.mainImage, ...(decor.additionalImages || [])];
  const hasMultipleImages = allImages.length > 1;

  return (
    <>
      <LogicUniversalMenu data={dataLogicMenu} />
      <div className="decor-page">
        <div className="decor-page__container">
          <div className="decor-page__gallery">
            <div className="decor-page__gallery__main">
              <Image
                src={allImages[selectedImage]}
                alt={decor.title}
                width={600}
                height={600}
                priority
              />
            </div>
          </div>

          <div className="decor-page__info">
            <div className="decor-page__info__header">
              <h1>{decor.title}</h1>
              <div className="decor-page__info__price">
                <span>{decor.price} ₽/ шт</span>
              </div>
            </div>

            {decor.description && (
              <div className="decor-page__info__description">
                <h2>Описание</h2>
                <p>{decor.description}</p>
              </div>
            )}

            {decor.additionalFields && decor.additionalFields.length > 0 && (
              <div className="decor-page__info__fields">
                <h2>Характеристики</h2>
                <ul className="fields-list">
                  {decor.additionalFields.map((field) => (
                    <li key={field.id}>
                      <span className="field-label">{field.label}:</span>
                      <span className="field-value">{field.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasMultipleImages && (
              <div className="decor-page__gallery__thumbs">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`decor-page__gallery__thumbs__item ${selectedImage === idx ? "active" : ""}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <Image
                      src={img}
                      alt={`${decor.title} - вид ${idx + 1}`}
                      width={80}
                      height={80}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="decor-page__info__actions">
              <button className="order-button" onClick={() => setIsOrderOpen(true)}>Заказать</button>
            </div>
          </div>
        </div>
      </div>
      {isOrderOpen && <ModalOrderDecor
        product={decor}
        onClose={() => setIsOrderOpen(false)}
      />}
    </>
  );
};

export default DecorPage;