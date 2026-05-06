"use client";

import { useEffect, useState } from "react";
import { ISeries } from "@/types/series.type";
import { IDecor } from "@/types/decor.type";
import MiniCatalogUi from "@/app/features/mini-catalog-ui";
import "./index.scss";

const MiniCatalog = () => {
  const [activeCategory, setActiveCategory] = useState<"ready" | "decor">("ready");
  const [series, setSeries] = useState<ISeries[]>([]);
  const [decorsData, setDecorsData] = useState<IDecor[]>([]);

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

  return <MiniCatalogUi 
  seriesData={data} 
  decorsData={decorsData} 
  activeCategory={activeCategory} 
  setActiveCategory={setActiveCategory} />
};

export default MiniCatalog;