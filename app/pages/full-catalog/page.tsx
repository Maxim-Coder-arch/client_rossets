import SeriesCard from "@/app/share/series-card/seriesCard";
import TemplateCards from "@/app/share/templateCards/templateCard";
import { seriesData } from "@/data/series.data";
import "./index.scss";
import LogicUniversalMenu from "@/app/share/universal-menu/logicUniversalMenu";

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
  return (
    <>
    <LogicUniversalMenu data={dataLogicMenu} />
      <div className="full-catalog">
        <div className="full-catalog__wrapper">
          <TemplateCards>
            {seriesData.map((item, index) => {
              return <SeriesCard product={item} key={index} />
            })}
          </TemplateCards>
        </div>
      </div>
    </>
  )
}

export default FullCatalog;