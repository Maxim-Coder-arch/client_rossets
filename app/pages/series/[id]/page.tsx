'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<ISeries[]>([]);
  const [seriesFilterData, setSeriesFilterData] = useState<ISeries | null>(null);

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
          (item: ISeries) => item.seriesId === params.id
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

  if (!seriesFilterData) {
    return (
      <h1>Серия не найдена</h1>
    )
  }


  return (
    <>
      <LogicUniversalMenu data={dataLogicMenu} />
      <section id="series-page">
        <div className="series-page">
          <div className="series-page__content">
            <div className="series-page__content__banner">
              <div className="series-page__content__banner__card-series">
                <div className="series-page__content__banner__card-series__image">
                  <Image src={seriesFilterData.image} alt="Series image" width={1000} height={500} />
                </div>
                <div className="series-page__content__banner__card-series__content">
                  <p>Название серии:</p>
                  <h2>{seriesFilterData.seriesTitle}</h2>
                  <span>Розеток в серии: {products.length}</span>
                </div>
              </div>
            </div>
            <div className="series-page__content__label-title">
              <h2>Розетки в этой серии</h2>
            </div>
            <div className="series-page__content__rossets">
              <TemplateCards>
                {products.map((product: IProduct) => (
                  <RossetCard key={product._id} {...product} />
                ))}
              </TemplateCards>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;