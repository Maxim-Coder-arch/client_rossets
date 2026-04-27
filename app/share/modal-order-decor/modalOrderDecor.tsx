"use client";

import { useState } from "react";
import Image from "next/image";
import "./index.scss";

interface IAdditionalField {
  id: number;
  label: string;
  value: string;
}

interface IDecor {
  _id: string;
  title: string;
  description: string;
  price: number;
  mainImage: string;
  additionalImages: string[];
  additionalFields: IAdditionalField[];
  createdAt: string;
}

interface ModalOrderDecorProps {
  product: IDecor;
  onClose: () => void;
}

const ModalOrderDecor = ({ product, onClose }: ModalOrderDecorProps) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    socialLink: "",
    comment: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Введите имя" });
      return;
    }

    if (!formData.contact.trim()) {
      setMessage({ type: "error", text: "Введите почту или телефон" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/bid-with-decor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product: {
            _id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            mainImage: product.mainImage,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Заявка успешно отправлена! Мы свяжемся с вами." });
        setFormData({ name: "", contact: "", socialLink: "", comment: "" });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage({ type: "error", text: data.error || "Ошибка при отправке" });
      }
    } catch {
      setMessage({ type: "error", text: "Ошибка соединения. Попробуйте позже." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-order-product" onClick={handleOverlayClick}>
      <div className="modal-order-product__content">
        <button className="modal-order-product__close" onClick={onClose}>✕</button>
        
        <div className="modal-order-product__product">
          <div className="modal-order-product__product__image">
            <Image src={product.mainImage} alt={product.title} width={120} height={120} />
          </div>
          <div className="modal-order-product__product__info">
            <h3>{product.title}</h3>
            <div className="product-details">
              {product.additionalFields && product.additionalFields.map((field) => (
                <span key={field.id}>{field.label}: {field.value}</span>
              ))}
            </div>
            <div className="product-price">{product.price} ₽ / шт</div>
          </div>
        </div>

        <form className="modal-order-product__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Имя *"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="contact"
              placeholder="Почта или телефон *"
              value={formData.contact}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="socialLink"
              placeholder="Ссылка на соцсеть (необязательно)"
              value={formData.socialLink}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="comment"
              placeholder="Комментарий (необязательно)"
              value={formData.comment}
              onChange={handleChange}
              disabled={isLoading}
              rows={3}
            />
          </div>
          
          {message && (
            <div className={`form-message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalOrderDecor;