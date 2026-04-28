import ModalDetail from "@/app/share/modal-details/modalDetail"
import Link from "next/link"

interface IHeroUiDataProps {
  title: string;
  description: string;
}

interface IHeroSetionProps {
  data: IHeroUiDataProps[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const HeroSectionUi = ({data, setIsModalOpen, isModalOpen}: IHeroSetionProps) => {
  return (
    <>
      <section id="hero-section">
        <div className="hero-section">
          <div className="hero-section__content template">
            <div className="hero-section__content__area">
              <p>Скидки от 200 штук. Работаем по всей России.</p>
              <h1>Наградные розетки высшего класса</h1>
              <span>Более 100 цветов атласной ленты. Индивидуальный дизайн. Срочное изготовление от 5 дней.</span>
              <div className="hero-section__content__area__target-actions">
                <Link 
                href="/pages/full-catalog"
                className="hero-section__content__area__target-actions__look-catalog-up">Смотреть каталог</Link>
                <button className="hero-section__content__area__target-actions__relations">Связаться с нами</button>
              </div>
            </div>
          </div>
          <div className="hero-section__image template">
            <div className="hero-section__image__wrapper"></div>
          </div>
          <div className="hero-section__bottom-wrapper">
            <div className="hero-section__bottom-wrapper__points">
              {data.map((item, index) => {
                return (
                  <div 
                  key={index}
                  className="hero-section__bottom-wrapper__points__item">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                )
              })}
              <button onClick={() => setIsModalOpen(true)}>Узнать детали</button>
            </div>
          </div>
        </div>
        <div className="hero-section-footer"></div>
      </section>
      {isModalOpen && <ModalDetail onClose={() =>setIsModalOpen(false)} />}
    </>
  )
}

export default HeroSectionUi