import SeriesCard from "@/app/common/series-card";
import DecorCard from "@/app/share/decorCard/decorCard";
import { IMiniCatalogUiProps } from "@/types/miniCatalogSectionUi.type";
import Link from "next/link"

const MiniCatalogUi = ({ seriesData, decorsData, activeCategory, setActiveCategory }: IMiniCatalogUiProps) => {
  return (
    <section className="mini-catalog-section">
      <div className="mini-catalog">
            <Link
              href="/pages/full-catalog"
              className="mini-catalog__link-all"
            >
              Смотреть полный каталог
            </Link>
        <div className="mini-catalog_meta">
          <div className="mini-catalog__header">
            <h2 className="mini-catalog__title">Каталог</h2>
          </div>

          <div className="mini-catalog__tabs">
            <button
              className={`mini-catalog__tab ${
                activeCategory === "ready" ? "active-tablink" : ""
              }`}
              onClick={() => setActiveCategory("ready")}
            >
              Серии
            </button>

            <button
              className={`mini-catalog__tab ${
                activeCategory === "decor" ? "active-tablink" : ""
              }`}
              onClick={() => setActiveCategory("decor")}
            >
              Декоры
            </button>
          </div>
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