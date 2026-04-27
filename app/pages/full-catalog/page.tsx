'use client';

import SeriesCard from "@/app/share/series-card/seriesCard";
import TemplateCards from "@/app/share/templateCards/templateCard";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";
import { useEffect, useState } from "react";
import "./index.scss";
import DecorCard from "@/app/share/decorCard/decorCard";

const dataLogicMenu = [
  {
    label: "Главная",
    link: "/"
  },
  {
    label: "Контакты",
    link: "#contacts"
  }
]

const FullCatalog = () => {
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [decorsData, setDecorsData] = useState<any[]>([]);
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch("/api/series");
        const data = await res.json();

        setSeriesData(data.series || []);
      } catch (err) {
        console.error("Ошибка загрузки серий:", err);
      }
    };

    fetchSeries();
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch("/api/decors");
        const data = await res.json();
        setDecorsData(data.decors);

      } catch (err) {
        console.error("Ошибка загрузки серий:", err);
      }
    };

    fetchSeries();
  }, []);

  return (
    <>
    <LogicUniversalMenu data={dataLogicMenu} />
      <div className="decors-block">
        {decorsData.map(decor => {
          return <DecorCard decor={decor} key={decor._id}/>
        })}
      </div>
      <div className="full-catalog">
        <div className="full-catalog__wrapper">
          <TemplateCards>
            {seriesData.map((item) => {
              return <SeriesCard product={item} key={item._id} />
            })}
          </TemplateCards>
        </div>
      </div>
    </>
  )
}

export default FullCatalog;