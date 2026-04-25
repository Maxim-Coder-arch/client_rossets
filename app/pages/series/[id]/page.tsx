'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RossetCard from "@/app/share/rossetCard/rossetCard";
import TemplateCards from "@/app/share/templateCards/templateCard";
import { seriesData } from "@/data/series.data";
import "./index.scss";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";

const dataLogicMenu = [
  { label: "Главная", link: "/" },
  { label: "Все серии", link: "/pages/full-catalog" },
  { label: "Контакты", link: "/contacts" }
];

const Product = () => {
  const params = useParams();
  const series = seriesData.find(item => item._id === params.id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (!series) {
    return <h1>Серия не найдена</h1>;
  }
  
  return (
    <>
      <LogicUniversalMenu data={dataLogicMenu} />
      <div className="series-page">
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