'use client';

import TemplateCards from "@/app/share/templateCards/templateCard";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ISeries } from "@/types/series.type";
import { IDecor } from "@/types/decor.type";
import Link from "next/link";
import ArrowRightIcon from "@/public/icons/arrowRight";
import { animate, motion, useMotionValue } from "framer-motion";
import ArrowLeftIcon from "@/public/icons/arrowLeft";
import { useMemo } from "react";
import "./index.scss";

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
  const [showContent, setShowContent] = useState(false);
  
  const itemsPerPage = 2;
  const seriesPerLoad = 10;
  
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleDecors = decorsData.slice(start, end);
  const totalPages = Math.ceil(decorsData.length / itemsPerPage);

  // Показываем контент после лоадера
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const sortedFilteredSeries = useMemo(() => {
    return getSortedSeries(filteredSeries, sortType);
  }, [filteredSeries, sortType]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleSeries(sortedFilteredSeries.slice(0, seriesLimit));
  }, [sortedFilteredSeries, seriesLimit]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeriesLimit(10);
    setSortType("default");
  }, [searchQuery]);

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
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={showContent ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="full-catalog__filteres"
          >
            <div className="full-catalog__filteres__title">
              <h2>Фильтры</h2>
            </div>
            
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

            <input 
              type="text" 
              placeholder="Поиск серии" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

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
          </motion.div>
          
          <div className="full-calalog__content">
            {/* Декоры */}
            {!searchQuery.length && (
              <div className="full-calalog__content__decors">
                <motion.div 
                  initial={{ y: -30, opacity: 0 }}
                  animate={showContent ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="full-calalog__content__series__title"
                >
                  <h2>Декоры</h2>
                  <span>Всего декоров: {decorsData.length}</span>
                </motion.div>
                
                <div className="full-calalog__content__decors__navigation">
                  <motion.button 
                    initial={{ scale: 0 }}
                    animate={showContent ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    onClick={goToPrev}
                  >
                    <ArrowLeftIcon />
                  </motion.button>
                  <motion.button 
                    initial={{ scale: 0 }}
                    animate={showContent ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.35 }}
                    onClick={goToNext}
                  >
                    <ArrowRightIcon />
                  </motion.button>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={showContent ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    {currentPage + 1} / {totalPages}
                  </motion.span>
                </div>
                
                <motion.div 
                  className="full-calalog__content__decors__cards"
                  initial={{ opacity: 0 }}
                  animate={showContent ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  {visibleDecors.map(item => (
                    <DecorCardDesign product={item} key={item._id} />
                  ))}
                </motion.div>
              </div>
            )}
            
            {/* Бегущий баннер */}
            <div className="full-calalog__content__banner">
              <motion.div 
                ref={containerRef}
                className="full-calalog__content__banner__track"
                style={{ x: baseX }}
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
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
              <motion.div 
                className="full-calalog__content__series__title"
                initial={{ y: -30, opacity: 0 }}
                animate={showContent ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <h2>Серии</h2>
                <span>Всего серий: {filteredSeries.length}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <TemplateCards>
                  {visibleSeries.map(item => (
                    <SeriesCardDesign product={item} key={item._id} />
                  ))}
                </TemplateCards>
              </motion.div>
              
              {visibleSeries.length < filteredSeries.length && (
                <motion.button 
                  onClick={loadMore} 
                  className="load-more"
                  initial={{ opacity: 0, y: 20 }}
                  animate={showContent ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  Загрузить еще ({filteredSeries.length - visibleSeries.length} осталось)
                </motion.button>
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