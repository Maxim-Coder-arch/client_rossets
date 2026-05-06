import { IBidFormSectionUiProps } from "@/types/bidFormSectionUi.type";

const BidFormSectionUi = ({ handleSubmit, handleChange, formData, isLoading, setAgreed, message, agreed }: IBidFormSectionUiProps) => {
  return (
    <section id="bid-form">
      <div className="bid-form">
        <div className="bid-form__block">
          <div className="bid-form__block__content">
            <div className="bid-form__block__content__label">
              <h2>Оставить заявку</h2>
              <p>Оставьте заявку в форме, мы сами свяжемся с вами в ближайшее время</p>
            </div>
            <div className="bid-form__block__content__choice">
              <div className="bid-form__block__content__choice__label">
                <div className="bid-form__block__content__choice__label__block"></div>
                или свяжитесь с нами
                <div className="bid-form__block__content__choice__label__block"></div>
              </div>
             </div>
             <div className="bid-form__block__content__contacts">
              <a href="tel:89125637645">+7 (912) 563-76-45</a>
              <a href="https://vk.com/vividribbon">ВКонтакте</a>
            </div>
         </div>
         <form className="bid-form__block__form" onSubmit={handleSubmit}>
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

            <div className="bid-form__block__form__checkbox">
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
             <div className={`bid-form__block__form__message ${message.type}`}>
               {message.text}
             </div>
           )}
            <button type="submit" disabled={isLoading}>
             {isLoading ? "Отправка..." : "Отправить"}
           </button>
         </form>
       </div>
      </div>
    </section>
  )
}

export default BidFormSectionUi;