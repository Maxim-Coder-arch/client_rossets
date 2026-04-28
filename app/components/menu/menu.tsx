import { dataMenu } from "@/data/menu.data";
import "./index.scss";

const Menu = () => {
  return (
    <nav className="navigation">
      <div className="menu">
        <div className="menu__logotype">
          Vivid Ribbon
        </div>
        <div className="menu__content">
          <ul className="menu__content__items">
            {dataMenu.map((item, index) => {
              return (
                <a className="menu__item" key={index} href={item.link}>
                  <li>{item.label}</li>
                </a>
              )
            })}
          </ul>
          <div className="menu__separator"></div>
          <div className="menu__target">
            <button>Связаться с нами</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu;