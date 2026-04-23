'use client';

import { useParams } from "next/navigation";
import { seriesData } from "@/data/series.data";
import { rossets } from "@/data/rossets.data";
import RossetCard from "@/app/share/rossetCard/rossetCard";
import TemplateCards from "@/app/share/templateCards/templateCard";
import "./index.scss";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";

const dataLogicMenu = [
  {
    label: "Главная",
    link: "/"
  },
  {
    label: "Все серии",
    link: "/pages/full-catalog"
  },
  {
    label: "Контакты",
    link: "/contacts"
  }
]

const Product = () => {
  const params = useParams();
  const series = seriesData.find(item => item._id === params.id);
  const seriesRossets = rossets.filter(
    rosset => rosset.seriesId === params.id
  );
  
  if (!series) {
    return <h1>Серия не найдена</h1>;
  }
  
  return (
    <>
      <LogicUniversalMenu data={dataLogicMenu} />
      <div className="series-page">
        <div className="series-page__wrapper">
          <TemplateCards>
          {seriesRossets.map((rosset, index) => {
            return (
                <RossetCard key={rosset._id} {...rosset} />
              )
            })}
            </TemplateCards>
        </div>
      </div>
    </>
  );
};

export default Product;