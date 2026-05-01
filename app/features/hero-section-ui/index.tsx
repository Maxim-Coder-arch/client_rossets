import ModalDetail from "@/app/share/modal-details/modalDetail"
import ArrowRightIcon from "@/public/icons/arrowRight";
import LinkIcon from "@/public/icons/link";
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
          <div className="hero-section__content">
            <div className="hero-section__content__header">
              <span>Более 100 цветов атласной ленты. Индивидуальный дизайн. Срочное изготовление от 5 дней.</span>
              <div className="hero-section__content__header__links">
                <div className="hero-section__content__header__links__order">
                  <Link href="#">Заказ</Link>
                </div>
                <div className="hero-section__content__header__links__relations">
                  <Link href="#">Полный каталог</Link>
                  <LinkIcon />
                </div>
              </div>
              <button onClick={() => setIsModalOpen(true)}>Открыть подробности</button>
            </div>
            <div className="hero-section__content__points">
              {data.map((item, index) => {
                return (
                  <div className="hero-section__content__points__point" key={index}>
                    <span>{item.description}</span>
                    <h2>{item.title}</h2>
                  </div>
                )
              })}
            </div>
            <div className="hero-section__content__company-name">
              <h1>Vivid Ribbon Award</h1>
              <span>Наградные розетки <strong>высшего класса</strong></span>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && <ModalDetail onClose={() =>setIsModalOpen(false)} />}
    </>
  )
}

export default HeroSectionUi