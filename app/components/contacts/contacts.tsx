import MailIcon from "@/public/icons/mail";
import PhoneIcon from "@/public/icons/phone";
import VkIcon from "@/public/icons/vk";
import "./index.scss";

const data = [
  {
    icon: <PhoneIcon />,
    label: "+7 495-656-38-19",
    link: "tel:+74956563819",
  },
  {
    icon: <MailIcon />,
    label: "rosset@rosettes.ru",
    link: "mailto:rosset@rosettes.ru",
  },
  {
    icon: <VkIcon />,
    label: "vk.com/vividribbon",
    link: "https://vk.com/vividribbon"
  },
]

const Contacts = () => {
  return (
    <section id="contacts">
      <div className="contacts">
        <div className="contacts__title">
          <h2>Свяжитесь с нами</h2>
          <p>Ответим на любые вопросы. Поможем подобрать дизайн. Рассчитаем стоимость за 15 минут.</p>
        </div>
        <div className="contacts__content">
          <div className="contacts__content__image"></div>
          <div className="contacts__content__items">
            {data.map((contact, index) => {
              return (
                <div className="contacts__content__items__contact" key={index}>
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
    </section>
  )
}

export default Contacts;

{/* 
      
       */}