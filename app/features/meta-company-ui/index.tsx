'use client';
import { motion } from "framer-motion";

interface IMetaCompanyUiDataProps {
  label: string;
  description: string;
}

const MetaCompanyUi = ({ data }: { data: IMetaCompanyUiDataProps[] }) => {
  return (
    <section id="meta-company">
      <div className="meta-company">
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="meta-company__content">
          <div className="meta-company__content__title">
            <h2>Индивидуальность - акцентная лента</h2>
            <p>Стандартным акцентом является цветная парчовая лента: золото, серебро, бронза, красный, синий, малиновый, тёмно-розовый, голубой,
            лазурный.</p>
          </div>
          <div className="meta-company__content__cards">
            {data.map((item, index) => {
              return (
                <div className="meta-company__content__cards__card" key={index}>
                  <div className="meta-company__content__cards__card__header">
                    <h2>{item.label}</h2>
                  </div>
                  <div className="meta-company__content__cards__card__content">
                    <p>{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MetaCompanyUi;










// <section id="meta-company">
    //   <div className="meta-company">
    //     <div className="meta-company__title">
    //       <h2>Индивидуальность - акцентная лента</h2>
    //       <p>Стандартным акцентом является цветная парчовая лента: золото, серебро, бронза, красный, синий, малиновый, тёмно-розовый, голубой,
    //       лазурный.</p>
    //     </div>
    //     <div className="meta-company__content">
    //       {data.map((item, index) => {
    //         return (
    //           <div className="meta-company__content__item" key={index}>
    //             <div className="meta-company__content__item__label">{item.label}</div>
    //             <p>{item.description}</p>
    //           </div>
    //         )
    //       })}
    //     </div>
    //   </div>
    // </section>