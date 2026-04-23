import BidForm from "./components/bid-form/form";
import Contacts from "./components/contacts/contacts";
import HeroSection from "./components/hero-section";
import Images from "./components/images/images";
import LogicMenu from "./components/menu/logic";
import MetaCompany from "./components/meta-company/metaCompany";
import MiniCatalog from "./components/mini-catalog/miniCatalog";
import Reviews from "./components/reviews/reviews";

export default function Home() {
  return (
    <>
      <div className="root-content">
        <main>
          <LogicMenu />
          <HeroSection />
          <MetaCompany />
          <MiniCatalog />
          <Contacts />
          <Images />
          <Reviews />
          <BidForm />
        </main>
      </div>
    </>
  );
}
