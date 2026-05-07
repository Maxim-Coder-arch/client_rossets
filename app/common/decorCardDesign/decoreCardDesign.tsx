"use client";

import { IDecor } from "@/types/decor.type";
import Link from "next/link";
import Image from "next/image";
import "./index.scss";

const DecorCardDesign = ({ product }: { product: IDecor }) => {
  return (
    <Link href={`/pages/decor/${product._id}`} className="link-decor-card">
      <div className="decor-card">
        <div className="decor-card__image">
          <div className="decor-card__image__wrapper">
            <Image
              src={product.mainImage || "/placeholder.jpg"}
              alt={product.title}
              width={400}
              height={400}
            />
          </div>
          <span>Декор</span>
        </div>
        <div className="decor-card__content">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default DecorCardDesign;