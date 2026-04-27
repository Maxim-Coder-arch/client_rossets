'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RossetCard from "@/app/share/rossetCard/rossetCard";
import TemplateCards from "@/app/share/templateCards/templateCard";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";
import Image from "next/image";
import "./index.scss";

const dataLogicMenu = [
  { label: "Главная", link: "/" },
  { label: "Все серии", link: "/pages/full-catalog" },
  { label: "Контакты", link: "/contacts" }
];

const Product = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [seriesFilterData, setSeriesFilterData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?seriesId=${params.id}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Ошибка загрузки розеток:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchProducts();
    }
  }, [params.id]);

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
        setSeries(seriesData);

        const currentSeries = seriesData.series.find(
          (item: any) => item.seriesId === params.id
        );

        setSeriesFilterData(currentSeries);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAll();
    }
  }, [params.id]);


  return (
    <>
      <LogicUniversalMenu data={dataLogicMenu} />
      <div className="series-page">
        <div className="series-page__banner">
          <Image src={seriesFilterData.image} alt="Series image" width={1000} height={500} />
          <div className="series-page__banner__overlay">
            <h1 className="series-page__banner__title">{seriesFilterData.seriesTitle}</h1>
            <p className="series-page__banner__count">Розеток в серии: {products.length}</p>
          </div>
        </div>
        <div className="series-page__wrapper">
          {loading ? (
            <div className="loading-spinner">Загрузка...</div>
          ) : products.length === 0 ? (
            <div className="empty-series">В этой серии пока нет розеток</div>
          ) : (
            <TemplateCards>
              {products.map((product: any) => (
                <RossetCard key={product._id} {...product} />
              ))}
            </TemplateCards>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;