import { dataMenu } from "./menu.data";
import MailIcon from "@/public/icons/mail";
import PhoneIcon from "@/public/icons/phone";
import VkIcon from "@/public/icons/vk";

const data = {
  contacts: [
    {
      icon: <PhoneIcon />,
      link: "tel:+74956563819",
    },
    {
      icon: <MailIcon />,
      link: "mailto:rosset@rosettes.ru",
    },
    {
      icon: <VkIcon />,
      link: "https://vk.com/vividribbon",
    },
  ],
  menu: dataMenu,
  additionaly: [
    {
      label: "Наградные розетки и праздничная атрибутика",
      link: "https://vk.com/vividribbon"
    },
    {
      label: "Монопородный питомник кошек мейн кунов",
      link: "https://vk.com/largeminion"
    },
  ],
  developer: [
    {
      label: "Разработка и поддержка сайта",
      link: "https://nexsol.ru"
    }
  ]
}


export { data as footerData };