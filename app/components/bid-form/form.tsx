"use client";

import { useState } from "react";
import "./index.scss";

const BidForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    socialLink: "",
    comment: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Сбрасываем предыдущее сообщение
    setMessage(null);
    
    // Валидация
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Введите имя" });
      return;
    }
    
    if (!formData.contact.trim()) {
      setMessage({ type: "error", text: "Введите почту или телефон" });
      return;
    }
    
    if (!agreed) {
      setMessage({ type: "error", text: "Подтвердите согласие с политикой конфиденциальности" });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/bid-without-goods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: "success", text: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время." });
        // Очищаем форму
        setFormData({ name: "", contact: "", socialLink: "", comment: "" });
        setAgreed(false);
      } else {
        setMessage({ type: "error", text: data.error || "Ошибка при отправке" });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage({ type: "error", text: "Ошибка соединения. Попробуйте позже." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="bid-form">
      <div className="bid">
        <div className="bid__label">
          <div className="bid__label__content">
            <h2>Оставить заявку</h2>
            <p>Оставьте заявку в форме, мы сами свяжемся с вами в ближайшее время</p>
            <div className="bid__label__content__choice">
              <div className="bid__label__content__choice__block"></div>
              или свяжитесь с нами
              <div className="bid__label__content__choice__block"></div>
            </div>
            <a href="tel:89125637645">+7 (912) 563-76-45</a>
            <a href="https://vk.com/vividribbon">ВКонтакте</a>
          </div>
        </div>
        
        <form className="bid__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Имя*"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="text"
            name="contact"
            placeholder="Почта или телефон*"
            value={formData.contact}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="text"
            name="socialLink"
            placeholder="Ссылка на соцсеть (необязательно)"
            value={formData.socialLink}
            onChange={handleChange}
            disabled={isLoading}
          />
          <textarea
            name="comment"
            placeholder="Комментарий (необязательно)"
            value={formData.comment}
            onChange={handleChange}
            disabled={isLoading}
            rows={3}
          />
          
          <div className="bid__form__checkbox">
            <input
              type="checkbox"
              id="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="checkbox">
              Нажимая кнопку «Отправить» вы соглашаетесь с политикой конфиденциальности
            </label>
          </div>
          
          {message && (
            <div className={`bid__form__message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BidForm;