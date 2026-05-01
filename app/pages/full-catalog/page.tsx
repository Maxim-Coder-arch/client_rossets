'use client';

// import SeriesCard from "@/app/share/series-card/seriesCard";
import TemplateCards from "@/app/share/templateCards/templateCard";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ISeries } from "@/types/series.type";
import { IDecor } from "@/types/decor.type";
import "./index.scss";
import Link from "next/link";
import ArrowRightIcon from "@/public/icons/arrowRight";
import { animate, motion, useMotionValue } from "framer-motion";
import ArrowLeftIcon from "@/public/icons/arrowLeft";
import { useMemo } from "react";

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
  const [seriesData, setSeriesData] = useState<ISeries[]>([]);
  const [decorsData, setDecorsData] = useState<IDecor[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleSeries, setVisibleSeries] = useState<ISeries[]>([]);
  const [seriesLimit, setSeriesLimit] = useState(10);
  const [sortType, setSortType] = useState<"default" | "newest" | "oldest">("default");
  const [searchQuery, setSearchQuery] = useState("");
  
  const itemsPerPage = 2;
  const seriesPerLoad = 10;
  
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleDecors = decorsData.slice(start, end);
  const totalPages = Math.ceil(decorsData.length / itemsPerPage);

  // Загрузка серий
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

  // Загрузка декоров
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

  // Функция сортировки
  const getSortedSeries = (data: ISeries[], type: string) => {
    if (!data.length) return [];
    switch (type) {
      case "newest":
        return [...data].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return [...data].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return data;
    }
  };

  // Фильтрация серий по поиску
  const filteredSeries = useMemo(() => {
    if (!searchQuery.trim()) return seriesData;
    return seriesData.filter(series => 
      series.seriesTitle.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [seriesData, searchQuery]);

  // Сортировка отфильтрованных серий
  const sortedFilteredSeries = useMemo(() => {
    return getSortedSeries(filteredSeries, sortType);
  }, [filteredSeries, sortType]);

  // Обновление видимых серий (пагинация)
  useEffect(() => {
    setVisibleSeries(sortedFilteredSeries.slice(0, seriesLimit));
  }, [sortedFilteredSeries, seriesLimit]);

  // Сброс при поиске
  useEffect(() => {
    setSeriesLimit(10);
    setSortType("default");
  }, [searchQuery]);

  // Пагинация декоров
  const goToNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Догрузка серий
  const loadMore = () => {
    if (seriesLimit < filteredSeries.length) {
      setSeriesLimit(prev => prev + seriesPerLoad);
    }
  };

  // Смена сортировки
  const handleSort = (type: "default" | "newest" | "oldest") => {
    setSortType(type);
    setSeriesLimit(10);
  };

  // Бегущий баннер
  const containerRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.scrollWidth / 2;
    const animateX = animate(baseX, -containerWidth, {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    });
    
    return () => animateX.stop();
  }, [baseX]);

  return (
    <>
      <LogicUniversalMenu data={dataLogicMenu} />
      <section id="full-catalog-section" className="full-catalog-section">
        <div className="full-calalog">
          <div className="full-catalog__filteres">
            <div className="full-catalog__filteres__title">
              <h2>Фильтры</h2>
            </div>
            
            {/* Сортировка */}
            <div className="full-catalog__filteres__buttons">
              <h3>Сортировка:</h3>
              <div className="full-catalog__filteres__buttons__container">
                <button 
                  onClick={() => handleSort("default")} 
                  className={sortType === "default" ? "active-filter" : ""}
                >
                  По умолчанию
                </button>
                <button 
                  onClick={() => handleSort("newest")} 
                  className={sortType === "newest" ? "active-filter" : ""}
                >
                  От новых к старым
                </button>
                <button 
                  onClick={() => handleSort("oldest")} 
                  className={sortType === "oldest" ? "active-filter" : ""}
                >
                  От старых к новым
                </button>
              </div>
            </div>

            {/* Поиск */}
            <input 
              type="text" 
              placeholder="Поиск серии" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Все серии (левое меню) */}
            <div className="full-catalog__filteres__all-series">
              <h3>Все серии</h3>
              <ul>
                {filteredSeries.map(seriesItem => (
                  <Link href={`/pages/series/${seriesItem.seriesId}`} key={seriesItem._id}>
                    <li>{seriesItem.seriesTitle}</li>
                  </Link>
                ))}
              </ul>
            </div>

            {/* Все декоры */}
            <div className="full-catalog__filteres__all-decors">
              <h3>Все декоры</h3>
              <ul>
                {decorsData.map(decorItem => (
                  <Link href={`/pages/decor/${decorItem._id}`} key={decorItem._id}>
                    <li>{decorItem.title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="full-calalog__content">
            {/* Декоры */}
            {!searchQuery.length && <div className="full-calalog__content__decors">
              <div className="full-calalog__content__series__title">
                <h2>Декоры</h2>
                <span>Всего декоров: {decorsData.length}</span>
              </div>
              <div className="full-calalog__content__decors__navigation">
                <button onClick={goToPrev}>
                  <ArrowLeftIcon />
                </button>
                <button onClick={goToNext}>
                  <ArrowRightIcon />
                </button>
                <span>{currentPage + 1} / {totalPages}</span>
              </div>
              <div className="full-calalog__content__decors__cards">
                {visibleDecors.map(item => (
                  <DecorCardDesign product={item} key={item._id} />
                ))}
              </div>
            </div>}
            
            {/* Бегущий баннер */}
            <div className="full-calalog__content__banner">
              <motion.div 
                ref={containerRef}
                className="full-calalog__content__banner__track"
                style={{ x: baseX }}
              >
                {Array.from({ length: 14 }).map((_, index) => (
                  <div key={index} className="full-calalog__content__banner__label">
                    Vivid Ribbon Awards - каталог
                  </div>
                ))}
                {Array.from({ length: 14 }).map((_, index) => (
                  <div key={`dup-${index}`} className="full-calalog__content__banner__label">
                    Vivid Ribbon Awards - каталог
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Серии */}
            <div className="full-calalog__content__series">
              <div className="full-calalog__content__series__title">
                <h2>Серии</h2>
                <span>Всего серий: {filteredSeries.length}</span>
              </div>
              <TemplateCards>
                {visibleSeries.map(item => (
                  <SeriesCardDesign product={item} key={item._id} />
                ))}
              </TemplateCards>
              {visibleSeries.length < filteredSeries.length && (
                <button onClick={loadMore} className="load-more">
                  Загрузить еще ({filteredSeries.length - visibleSeries.length} осталось)
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FullCatalog;


export const SeriesCardDesign = ({ product }: { product: ISeries }) => {
  return (
    <Link href={`/pages/series/${product.seriesId}`} className="link-series-card">
      <div className="series-card-design">
        <div className="series-card-design__image">
          <div className="series-card-design__image__wrapper">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.seriesTitle}
              width={400}
              height={400}
            />
          </div>
          <span>Серия</span>
        </div>
        <div className="series-card-design__series-name">
          <h3>{product.seriesTitle}</h3>
          <ArrowRightIcon />
        </div>
      </div>
    </Link>
  )
}


const DecorCardDesign = ({ product }: { product: IDecor }) => {
  return (
    <Link href={`/pages/decor/${product._id}`} className="link-decor-card">
      <div className="decor-card">
        <div className="decor-card__image">
          <div className="decor-card__image__wrapper">
            <Image
              src={product.mainImage || "/placeholder.jpg"}
              alt={product.title}
              width={400}
              height={400}
            />
          </div>
          <span>Декор</span>
        </div>
        <div className="decor-card__content">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </Link>
  )
}