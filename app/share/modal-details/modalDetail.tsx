import CloseIcon from "@/public/icons/close";
import { modalDetailData as modalData } from "@/data/modalDetail.data";
import "./index.scss";

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