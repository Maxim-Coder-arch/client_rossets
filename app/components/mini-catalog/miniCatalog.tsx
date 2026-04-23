"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { seriesData } from "@/data/series.data";
import "./index.scss";

const decorData = [
  { 
    _id: "decor1", 
    image: "https://sun9-21.userapi.com/s/v1/ig2/GdbJCGArz3DoDBqi9wZ6kWcmZLg-3ZSIaSgFKw_jMtmhoSCdJzoz7lhOTe7JxqRCjH5CEe2zUD2FfDjoiIZR84uV.jpg?quality=95&crop=0,17,941,1411&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,941x1411&from=bu&u=UsUDD9GmXTGY0ccPKlBbxos0fPH_MvgH-NiFJl3ncS8&cs=941x0", 
    title: "Розочки", 
    link: "/decor/1" 
  },
  { 
    _id: "decor2", 
    image: "https://sun9-21.userapi.com/s/v1/ig2/GdbJCGArz3DoDBqi9wZ6kWcmZLg-3ZSIaSgFKw_jMtmhoSCdJzoz7lhOTe7JxqRCjH5CEe2zUD2FfDjoiIZR84uV.jpg?quality=95&crop=0,17,941,1411&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,941x1411&from=bu&u=UsUDD9GmXTGY0ccPKlBbxos0fPH_MvgH-NiFJl3ncS8&cs=941x0", 
    title: "Стразы", 
    link: "/decor/2" 
  },
  { 
    _id: "decor3", 
    image: "https://sun9-21.userapi.com/s/v1/ig2/GdbJCGArz3DoDBqi9wZ6kWcmZLg-3ZSIaSgFKw_jMtmhoSCdJzoz7lhOTe7JxqRCjH5CEe2zUD2FfDjoiIZR84uV.jpg?quality=95&crop=0,17,941,1411&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,941x1411&from=bu&u=UsUDD9GmXTGY0ccPKlBbxos0fPH_MvgH-NiFJl3ncS8&cs=941x0", 
    title: "Кисти", 
    link: "/decor/3" 
  },
];

const SeriesCard = ({ product }: { product: any }) => {
  return (
    <div className="series-card">
      <div className="series-card__image">
        <Image 
          src={product.image} 
          alt={product.seriesTitle || product.title} 
          width={400} 
          height={400} 
        />
      </div>
      <div className="series-card__content">
        <h3 className="series-card__title">{product.seriesTitle || product.title}</h3>
        <Link 
          href={product.link || `/pages/series/${product._id}`} 
          className="series-card__link"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

const MiniCatalog = () => {
  const [activeCategory, setActiveCategory] = useState<"ready" | "decor">("ready");
  const data = seriesData.slice(0, 8);
  
  return (
    <section className="mini-catalog-section">
      <div className="mini-catalog">
        <div className="mini-catalog__header">
          <h2 className="mini-catalog__title">Каталог</h2>
          <p className="mini-catalog__subtitle">Заказывают чаще всего</p>
          <Link href="/pages/full-catalog" className="mini-catalog__link-all">
            Смотреть полный каталог →
          </Link>
        </div>
        
        <div className="mini-catalog__tabs">
          <button 
            className={`mini-catalog__tab ${activeCategory === "ready" ? "active" : ""}`}
            onClick={() => setActiveCategory("ready")}
          >
            Серии
          </button>
          <button 
            className={`mini-catalog__tab ${activeCategory === "decor" ? "active" : ""}`}
            onClick={() => setActiveCategory("decor")}
          >
            Декоры
          </button>
        </div>
        
        <div className="mini-catalog__grid">
          {activeCategory === "ready" && data.map((product) => (
            <SeriesCard product={product} key={product._id} />
          ))}
          {activeCategory === "decor" && decorData.map((item) => (
            <SeriesCard product={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiniCatalog;