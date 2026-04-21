import Contacts from "./components/contacts/contacts";
import HeroSection from "./components/hero-section";
import Images from "./components/images/images";
import MetaCompany from "./components/meta-company/metaCompany";
import MiniCatalog from "./components/mini-catalog/miniCatalog";
import Reviews from "./components/reviews/reviews";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MetaCompany />
      <MiniCatalog />
      <Contacts />
      <Images />
      <Reviews />
    </>
  );
}
