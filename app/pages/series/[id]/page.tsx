'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RossetCard from "@/app/share/rossetCard/rossetCard";
import TemplateCards from "@/app/share/templateCards/templateCard";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";
import Image from "next/image";
import { ISeries } from "@/types/series.type";
import { IProduct } from "@/types/product.type";
import "./index.scss";

const dataLogicMenu = [
  { label: "Главная", link: "/" },
  { label: "Все серии", link: "/pages/full-catalog" },
  { label: "Контакты", link: "/contacts" }
];

const Product = () => {
  const params = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [seriesFilterData, setSeriesFilterData] = useState<ISeries | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productsRes, seriesRes] = await Promise.all([
          fetch(`/api/products?seriesId=${params.id}`),
          fetch("/api/series"),
        ]);

        const productsData = await productsRes.json();
        const seriesData = await seriesRes.json();

        setProducts(productsData);
        
        const currentSeries = seriesData.series?.find(
          (item: ISeries) => item.seriesId === params.id
        ) || null;

        setSeriesFilterData(currentSeries);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        // Показываем контент после загрузки данных
        setTimeout(() => setShowContent(true), 100);
      }
    };

    if (params.id) {
      fetchAll();
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <LogicUniversalMenu data={dataLogicMenu} />
        <div className="series-page-loading">Загрузка...</div>
      </>
    );
  }

  if (!seriesFilterData) {
    return (
      <>
        <LogicUniversalMenu data={dataLogicMenu} />
        <div className="series-page-not-found">Серия не найдена</div>
      </>
    );
  }

  // Анимация для баннера
  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }
  };

  // Анимация для заголовка
  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } }
  };

  // Анимация для карточек (по очереди)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  return (
    <>
      <LogicUniversalMenu data={dataLogicMenu} />
      <section id="series-page">
        <div className="series-page">
          <div className="series-page__content">
            {/* Баннер с анимацией */}
            <motion.div 
              className="series-page__content__banner"
              initial="hidden"
              animate={showContent ? "visible" : "hidden"}
              variants={bannerVariants}
            >
              <div className="series-page__content__banner__card-series">
                <div className="series-page__content__banner__card-series__image">
                  <Image 
                    src={seriesFilterData.image} 
                    alt="Series image" 
                    width={1000} 
                    height={500} 
                  />
                </div>
                <div className="series-page__content__banner__card-series__content">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    Название серии:
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    {seriesFilterData.seriesTitle}
                  </motion.h2>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    Розеток в серии: {products.length}
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Заголовок секции */}
            <motion.div 
              className="series-page__content__label-title"
              initial="hidden"
              animate={showContent ? "visible" : "hidden"}
              variants={titleVariants}
            >
              <h2>Розетки в этой серии</h2>
            </motion.div>

            {/* Карточки розеток */}
            <motion.div 
              className="series-page__content__rossets"
              initial="hidden"
              animate={showContent ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <TemplateCards>
                {products.map((product) => (
                  <RossetCard {...product} key={product._id} />
                ))}
              </TemplateCards>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;