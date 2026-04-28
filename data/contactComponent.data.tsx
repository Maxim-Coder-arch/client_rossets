import MailIcon from "@/public/icons/mail";
import PhoneIcon from "@/public/icons/phone";
import VkIcon from "@/public/icons/vk";

const data = [
  {
    icon: <PhoneIcon />,
    label: "+7 495-656-38-19",
    link: "tel:+74956563819",
  },
  {
    icon: <MailIcon />,
    label: "rosset@rosettes.ru",
    link: "mailto:rosset@rosettes.ru",
  },
  {
    icon: <VkIcon />,
    label: "vk.com/vividribbon",
    link: "https://vk.com/vividribbon"
  },
]

export { data as contactsData };