import { JSX } from "react"

interface IContactsSectionUiDataProps {
  icon: JSX.Element;
  link: string;
  label: string;
}


const ContactsSectionUi = ({ data }: { data: IContactsSectionUiDataProps[] }) => {
  return (
    <section id="contacts">
      <div className="contacts">
        <div className="contacts__content">
          <div className="contacts__content__header">
            <h2>Свяжитесь с нами</h2>
            <p>Ответим на любые вопросы. Поможем подобрать дизайн. Рассчитаем стоимость за 15 минут.</p>
          </div>
          <div className="contacts__content__wrapper">
            <div className="contacts__content__image"></div>
            <div className="contacts__content__wrapper__contact-block">
              {data.map((contact, index) => {
                  return (
                    <div className={`contacts__content__contact contact-${index}`} key={index}>
                      <div className="contacts__content__items__contact__icon">{contact.icon}
                      </div>
                      <div className="contacts__content__items__contact__label">
                        <a href={contact.link} target="_blank">{contact.label}</a>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactsSectionUi;