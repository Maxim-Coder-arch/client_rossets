'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./index.scss";
// - картинка
// - строчка
// - номер серии
// - номер розетки 
// - диаметр 
// - количество хвостов
// - длина
// - коментарий опционально. Описание
// - цены

const data = [
  {
    _id: "1",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  },
  {
    _id: "2",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  },
  {
    _id: "3",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  },
  {
    _id: "4",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  },
  {
    _id: "5",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  },
  {
    _id: "6",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  },
  {
    _id: "7",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  },
  {
    _id: "8",
    image: "https://sun9-56.userapi.com/s/v1/ig2/zoApYnrZLOlHrWYCAJ8VFJr0NZRfqgRI_7C4acecIttSrqEByho6rj2fU1h069li_2jk7-Swgy5Uc4W444sV-gH2.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x427,720x480,1080x720,1280x853,1440x960,1914x1276&from=bu&u=pEBhq254RakGxWRnRAmu7ZT-Ad_V7dYICbVg57fYiYc&cs=540x0",
    len: "70см",
    price: "1000",
  }
]

const MiniCatalog = () => {
  const [activeCategory, setActiveCategory] = useState<"ready" | "decor">("ready");
  return (
    <section id="mini-catalog">
      <div className="mini-catalog">
        <div className="mini-catalog__title">
          <h2>Каталог</h2>
          <p>Заказывают чаще всего</p>
        </div>
        <div className="mini-catalog__choice">
          <button onClick={() => setActiveCategory("ready")}>Готовые розетки</button>
          <button onClick={() => setActiveCategory("decor")}>Декоры</button>
        </div>
        <div className="mini-catalog__cards">
          { activeCategory === "ready" && data.map((product, index) => {
            return (
              <div className="mini-catalog__cards__card" key={product._id}>
                <div className="mini-catalog__cards__card__image">
                  <div className="mini-catalog__cards__card__image__wrapper">
                    <Image src={product.image} alt="product" width={400} height={400} />
                  </div>
                </div>
                <div className="mini-catalog__cards__card__header">
                  <h3>Длина: {product.len}</h3>
                </div>
                <div className="mini-catalog__cards__card__footer">
                  <h3>{product.price} руб.</h3>
                  <Link href={"#"}>Подробнее</Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MiniCatalog;