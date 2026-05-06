"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IContactsSectionUiDataProps } from "@/types/contactsSectionUi.type";

const ContactsSectionUi = ({ data }: { data: IContactsSectionUiDataProps[] }) => {
  const parentReference = useRef(null);
  const viewChild = useInView(parentReference, {once: true, amount: .5});

  return (
    <section id="contacts">
      <div className="contacts" ref={parentReference}>
        <div className="contacts__content">
          <div className="contacts__content__header">
            <h2>Свяжитесь с нами</h2>
            <p>Ответим на любые вопросы. Поможем подобрать дизайн. Рассчитаем стоимость за 15 минут.</p>
          </div>
          <div className="contacts__content__wrapper">
            <motion.div className="contacts__content__image"
            initial={{y: 100, opacity: 0}}
            animate={viewChild ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: .5
            }}
            />
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