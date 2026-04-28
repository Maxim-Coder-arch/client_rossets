import { footerData as data } from "@/data/footer.data";
import FooterSectionUi from "@/app/features/footer-section-ui";
import "./index.scss";

const Footer = () => {
  return <FooterSectionUi data={data} />
}

export default Footer;