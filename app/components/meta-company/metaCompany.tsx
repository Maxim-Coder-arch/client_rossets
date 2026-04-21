import "./index.scss";

const data = [
  {
    label: "10+",
    description: "Лет на рынке наградной продукции"
  },
  {
    label: "50 000+",
    description: "Розеток изготовлено"
  },
  {
    label: "500+",
    description: " довольных клиентов"
  },
]

const MetaCompany = () => {
  return (
    <section id="meta-company">
      <div className="meta-company">
        <div className="meta-company__title">
          <h2>Индивидуальность - акцентная лента</h2>
          <p>Стандартным акцентом является цветная парчовая лента: золото, серебро, бронза, красный, синий, малиновый, тёмно-розовый, голубой,
          лазурный.</p>
        </div>
        <div className="meta-company__content">
          {data.map((item, index) => {
            return (
              <div className="meta-company__content__item" key={index}>
                <div className="meta-company__content__item__label">{item.label}</div>
                <p>{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MetaCompany;