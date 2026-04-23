"use client";

import { useState } from "react";
import Link from "next/link";
import { seriesData } from "@/data/series.data";
import "./index.scss";
import SeriesCard from "@/app/share/series-card/seriesCard";
import TemplateCards from "@/app/share/templateCards/templateCard";



const MiniCatalog = () => {
  const [activeCategory, setActiveCategory] = useState<"ready" | "decor">("ready");
  const data = seriesData.slice(0, 8);
  
  return (
    <section id="mini-catalog">
      <div className="mini-catalog">
        <div className="mini-catalog__title">
          <h2>Каталог</h2>
          <p>Заказывают чаще всего</p>
          <Link href="/pages/full-catalog">Смотреть полный каталог</Link>
        </div>
        
        <div className="mini-catalog__choice">
          <button 
            data-active={activeCategory === "ready"}
            onClick={() => setActiveCategory("ready")}
          >
            Серии
          </button>
          <button 
            data-active={activeCategory === "decor"}
            onClick={() => setActiveCategory("decor")}
          >
            Декоры
          </button>
        </div>
        <TemplateCards>
          {activeCategory === "ready" && data.map((product) => (
            <SeriesCard product={product} key={product._id} />
          ))}
        </TemplateCards>
      </div>
    </section>
  );
};

export default MiniCatalog;