'use client';

import { useState } from "react";
import { heroSectionLabelData as data } from "@/data/heroSectionLabel.data";
import HeroSectionUi from "@/app/features/hero-section-ui";
import "./index.scss";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HeroSectionUi 
    data={data} 
    setIsModalOpen={setIsModalOpen} 
    isModalOpen={isModalOpen} />
  )
}

export default HeroSection;