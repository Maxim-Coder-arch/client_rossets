import "./index.scss";

const BidForm = () => {
  return (
    <section id="bid-form">
      <div className="bid">
        <div className="bid__label">
          <div className="bid__label__content">
            <h2>Оставить заявку</h2>
            <p>Оставьте заявку в форме, мы сами свяжемся с вами в ближайшее время</p>
            <div className="bid__label__content__choice">
              <div className="bid__label__content__choice__block"></div>
                или свяжитесь с нам
              <div className="bid__label__content__choice__block"></div>
            </div>
            <a href="tel:89125637645">+7 (912) 563-76-45</a>
            <a href="https://vk.com/vividribbon">ВКонтакте</a>
          </div>
        </div>
        <form className="bid__form">
          <input type="text" placeholder="Имя*" />
          <input type="mail" placeholder="Почта или телефон*" />
          <textarea name="" id="" placeholder="Комментарий (необязательно)"></textarea>
          <div className="bid__form__checkbox">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Нажимая кнопку «Отправить» вы соглашаетесь с политикой конфиденциальности</label>
          </div>
          <button>Отправить</button>
        </form>
      </div>
    </section>
  )
}

export default BidForm;