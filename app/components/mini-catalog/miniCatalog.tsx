"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./index.scss";
import DecorCard from "@/app/share/decorCard/decorCard";

const SeriesCard = ({ product }: { product: any }) => {
  return (
    <div className="series-card">
      <div className="series-card__image">
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.seriesTitle}
          width={400}
          height={400}
        />
      </div>

      <div className="series-card__content">
        <h3 className="series-card__title">{product.seriesTitle}</h3>

        <Link
          href={`/pages/series/${product.seriesId}`}
          className="series-card__link"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

const MiniCatalog = () => {
  const [activeCategory, setActiveCategory] =
    useState<"ready" | "decor">("ready");

  const [series, setSeries] = useState<any[]>([]);
  const [decorsData, setDecorsData] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchDecors = async () => {
      try {
        const res = await fetch("/api/decors");
        const data = await res.json();

        setDecorsData(data.decors || []);
      } catch (err) {
        console.error("Ошибка загрузки декоров:", err);
      }
    };

    fetchDecors();
  }, []);

  const data = series.slice(0, 8);

  return (
    <section className="mini-catalog-section">
      <div className="mini-catalog">
        <div className="mini-catalog__header">
          <h2 className="mini-catalog__title">Каталог</h2>
          <p className="mini-catalog__subtitle">
            Заказывают чаще всего
          </p>

          <Link
            href="/pages/full-catalog"
            className="mini-catalog__link-all"
          >
            Смотреть полный каталог →
          </Link>
        </div>

        <div className="mini-catalog__tabs">
          <button
            className={`mini-catalog__tab ${
              activeCategory === "ready" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("ready")}
          >
            Серии
          </button>

          <button
            className={`mini-catalog__tab ${
              activeCategory === "decor" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("decor")}
          >
            Декоры
          </button>
        </div>

        <div className="mini-catalog__grid">
          {activeCategory === "ready" &&
            data.map((item) => (
              <SeriesCard product={item} key={item._id} />
            ))}

          {activeCategory === "decor" &&
            decorsData.map((item) => (
              <DecorCard decor={item} key={item._id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default MiniCatalog;