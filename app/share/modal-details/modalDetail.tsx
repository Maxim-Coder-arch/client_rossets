import CloseIcon from "@/public/icons/close";
import "./index.scss";

const modalData = {
  title: "Атласная лента",
  description:
    "Мы используем более ста оттенков ленты. Наличие у нас того или иного цвета зависит от поставщика, поэтому заказывайте заранее. Сроки исполнения: срочный заказ — от 5 рабочих дней, стандартный — до 8 недель.",
  sections: [
    {
      title: "Тиснение фольгой",
      description:
        "Мы работаем с фольгой следующих цветов: золото, серебро, бронза, красный, синий, зелёный, фиолетовый. С матовой фольгой по ленте мы не работаем. Основные виды надписей входят в стоимость розетки и наносятся с использованием базовых клише. Дополнительные надписи (название шоу, спонсора и индивидуальный декор) делаются с помощью отдельного клише и рассчитываются отдельно. В стоимость включено до 4 оттисков на центральном стримере. Макет и изготовление клише считаются отдельно.",
    },
    {
      title: "Серединки",
      list: [
        "Тиснение фольгой на глянцевом картоне. Используется для маленьких розеток. С индивидуальным изображением — тираж не менее 1000 шт., макет и клише считаются отдельно.",
        "Тиснение фольгой на атласе. Основной вид серединки для розеток, входит в стоимость изделия.",
        "Полноцветный значок. При индивидуальной серединке к заказу добавляется стоимость макета. Наши стандартные значки с породами собак входят в стоимость розеток.",
        "Роза из атласной ленты или парчи. Плюс 12 рублей к цене.",
      ],
    },
    {
      title: "Изготовление клише",
      list: [
        "Печать на центральном стримере. Ширина до 40 мм, высота до 11 см.",
        "Индивидуальная серединка. Диаметр клише до 45 мм.",
        "Печать на боковом стримере (спонсорское клише — 4 рубля за оттиск). Стоимость 200 руб.",
      ],
    },
  ],
};

const ModalDetail = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-detail">
      <div className="modal-detail__frame">
        <div className="modal-detail__frame__header">
          <div className="modal-detail__frame__header__contact">
            Мы может ответить на ваши вопросы: <a href="https://vk.com/vividribbon">Напишите нам</a>
          </div>
          <button className="modal-detail__frame__header__close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div>
          <div className="modal-detail__frame__title">
            <h2>{modalData.title}</h2>
          </div>
          <div className="modal-detail__frame__description">
            <p>{modalData.description}</p>
          </div>
        </div>
        {modalData.sections.map((section, idx) => (
          <div key={idx}>
            <div className="modal-detail__frame__title">
              <h2>{section.title}</h2>
            </div>
            <div className="modal-detail__frame__description">
              {section.list ? (
                <ul>
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{section.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalDetail;