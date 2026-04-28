import Link from "next/link";
import { JSX } from "react";

interface IFooterDataProps {
  contacts: {
    icon: JSX.Element;
    link: string;
  }[];
  menu: {
    label: string;
    link: string;
  }[];
  additionaly: {
    label: string;
    link: string;
  }[];
  developer: {
    label: string;
    link: string;
  }[]
}

const FooterSectionUi = ({ data }: {data: IFooterDataProps}) => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__content">
        <div className="footer__content__target">
          <div className="footer__content__target__logotype">Vivid Ribbon</div>
          <div className="footer__content__target__text">Наградные розетки высшего класса. Индивидуальное изготовление. Более 100 цветов ленты.</div>
          <div className="footer__content__target__contacts">
            {data.contacts.map((contact, index) => {
              return (
                <a className="footer__content__target__contacts__contact" key={index} href={contact.link} target="_blank">
                  {contact.icon}
                </a>
              )
            })}
          </div>
        </div>
        <div className="footer__content__meta">
          <div className="footer__content__template">
            <div className="footer__content__template__title">
              Меню
            </div>
            <ul>
              {data.menu.map((item, index) => {
                return (
                  <a className="footer__content__menu__item" key={index} href={item.link}>
                    <li>{item.label}</li>
                  </a>
                )
              })}
            </ul>
          </div>
          <div className="footer__content__template">
            <div className="footer__content__template__title">
              Дополнительно
            </div>
            <ul>
              {data.additionaly.map((item, index) => {
                return (
                  <a className="footer__content__additionaly__item" key={index} href={item.link}>
                    <li>{item.label}</li>
                  </a>
                )
              })}
            </ul>
          </div>
          <div className="footer__content__template">
            <div className="footer__content__template__title">
              Разработчик
            </div>
            <ul>
              {data.developer.map((item, index) => {
                return (
                  <a className="footer__content__developer__item" key={index} href={item.link}>
                    <li>{item.label}</li>
                  </a>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        © 2022 Vivid Ribbon. Все права защищены.
        <Link href="/privacy">Политика конфиденциальности</Link>
      </div>
    </footer>
  )
}

export default FooterSectionUi;