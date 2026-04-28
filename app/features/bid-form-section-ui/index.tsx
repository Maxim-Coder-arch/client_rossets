interface IBidFormSectionUiProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  formData: {
    name: string;
    contact: string;
    socialLink: string;
    comment: string;
  };
  isLoading: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  message: { type: "success" | "error"; text: string } | null;
  agreed: boolean;
}

const BidFormSectionUi = ({ handleSubmit, handleChange, formData, isLoading, setAgreed, message, agreed }: IBidFormSectionUiProps) => {
  return (
    <section id="bid-form">
      <div className="bid">
        <div className="bid__label">
          <div className="bid__label__content">
            <h2>Оставить заявку</h2>
            <p>Оставьте заявку в форме, мы сами свяжемся с вами в ближайшее время</p>
            <div className="bid__label__content__choice">
              <div className="bid__label__content__choice__block"></div>
              или свяжитесь с нами
              <div className="bid__label__content__choice__block"></div>
            </div>
            <a href="tel:89125637645">+7 (912) 563-76-45</a>
            <a href="https://vk.com/vividribbon">ВКонтакте</a>
          </div>
        </div>
        
        <form className="bid__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Имя*"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="text"
            name="contact"
            placeholder="Почта или телефон*"
            value={formData.contact}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="text"
            name="socialLink"
            placeholder="Ссылка на соцсеть (необязательно)"
            value={formData.socialLink}
            onChange={handleChange}
            disabled={isLoading}
          />
          <textarea
            name="comment"
            placeholder="Комментарий (необязательно)"
            value={formData.comment}
            onChange={handleChange}
            disabled={isLoading}
            rows={3}
          />
          
          <div className="bid__form__checkbox">
            <input
              type="checkbox"
              id="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="checkbox">
              Нажимая кнопку «Отправить» вы соглашаетесь с политикой конфиденциальности
            </label>
          </div>
          
          {message && (
            <div className={`bid__form__message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default BidFormSectionUi;