"use client";

import { useState } from "react";
import Link from "next/link";
import { seriesData } from "@/data/series.data";
import "./index.scss";
import SeriesCard from "@/app/share/series-card/seriesCard";
import TemplateCards from "@/app/share/templateCards/templateCard";

const decorData = [
  { _id: "decor1", image: "https://sun9-21.userapi.com/s/v1/ig2/GdbJCGArz3DoDBqi9wZ6kWcmZLg-3ZSIaSgFKw_jMtmhoSCdJzoz7lhOTe7JxqRCjH5CEe2zUD2FfDjoiIZR84uV.jpg?quality=95&crop=0,17,941,1411&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,941x1411&from=bu&u=UsUDD9GmXTGY0ccPKlBbxos0fPH_MvgH-NiFJl3ncS8&cs=941x0", title: "Розочки", link: "/decor/1" },
  { _id: "decor2", image: "https://sun9-21.userapi.com/s/v1/ig2/GdbJCGArz3DoDBqi9wZ6kWcmZLg-3ZSIaSgFKw_jMtmhoSCdJzoz7lhOTe7JxqRCjH5CEe2zUD2FfDjoiIZR84uV.jpg?quality=95&crop=0,17,941,1411&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,941x1411&from=bu&u=UsUDD9GmXTGY0ccPKlBbxos0fPH_MvgH-NiFJl3ncS8&cs=941x0", title: "Стразы", link: "/decor/2" },
];

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
          {activeCategory === "decor" && decorData.map((item) => (
            <SeriesCard product={item} key={item._id} /> // нужно будет сделать DecorCard
          ))}
        </TemplateCards>
      </div>
    </section>
  );
};

export default MiniCatalog;