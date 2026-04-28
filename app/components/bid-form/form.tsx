"use client";

import { useState } from "react";
import BidFormSectionUi from "@/app/features/bid-form-section-ui";
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
    setMessage(null);
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

  return <BidFormSectionUi 
  handleSubmit={handleSubmit} 
  handleChange={handleChange} 
  formData={formData} 
  isLoading={isLoading} 
  setAgreed={setAgreed} 
  message={message} 
  agreed={agreed} />
};

export default BidForm;