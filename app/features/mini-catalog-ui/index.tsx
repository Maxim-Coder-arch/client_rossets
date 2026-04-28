import SeriesCard from "@/app/common/series-card";
import DecorCard from "@/app/share/decorCard/decorCard";
import { IDecor } from "@/types/decor.type";
import { ISeries } from "@/types/series.type"
import Link from "next/link"

interface IMiniCatalogUiProps {
  seriesData: ISeries[];
  decorsData: IDecor[];
  activeCategory: "ready" | "decor";
  setActiveCategory: React.Dispatch<React.SetStateAction<"ready" | "decor">>;
}

const MiniCatalogUi = ({ seriesData, decorsData, activeCategory, setActiveCategory }: IMiniCatalogUiProps) => {
  return (
    <section className="mini-catalog-section">
      <div className="mini-catalog">
        <div className="mini-catalog__header">
          <h2 className="mini-catalog__title">Каталог</h2>
          <p className="mini-catalog__subtitle">
            Заказывают чаще всего
          </p>

          <Link
            href="/pages/full-catalog"
            className="mini-catalog__link-all"
          >
            Смотреть полный каталог →
          </Link>
        </div>

        <div className="mini-catalog__tabs">
          <button
            className={`mini-catalog__tab ${
              activeCategory === "ready" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("ready")}
          >
            Серии
          </button>

          <button
            className={`mini-catalog__tab ${
              activeCategory === "decor" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("decor")}
          >
            Декоры
          </button>
        </div>

        <div className="mini-catalog__grid">
          {activeCategory === "ready" &&
            seriesData.map((item) => (
              <SeriesCard product={item} key={item._id} />
            ))}

          {activeCategory === "decor" &&
            decorsData.map((item) => (
              <DecorCard decor={item} key={item._id} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default MiniCatalogUi;