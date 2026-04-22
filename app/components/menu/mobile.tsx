'use client';

import { dataMenu } from "./menu";
import "./index.scss";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="mobile-menu">
        <div className="mobile-menu__logotype">
          Vivid Ribbon
        </div>
        <button className="mobile-menu__button" onClick={() => setIsOpen(prev=>!prev)}>
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <div className={`mobile-menu__button__item ${isOpen ? `active-${index}` : ""}`} key={index}></div>
              )
            })}
        </button>
      </nav>
      {isOpen && <div className="mobile-modal">
        <div className="mobile-modal__points">
          <ul>
            {dataMenu.map((item, index) => {
              return (
                <Link key={index} href={item.link}>
                  <li>{item.label}</li>
                </Link>
              )
            })}
          </ul>
        </div>
        <div className="mobile-modal__footer">
          <Link href="/contacts">ВКонтакте</Link>
          <a href="tel:89124456578">+7 (912) 445-65-78</a>
          <a href="mailto:user@gmail.com">user@gmail.com</a>
        </div>
      </div>}
    </>
  )
}

export default MobileMenu;