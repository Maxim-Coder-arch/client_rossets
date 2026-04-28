import { contactsData as data } from "@/data/contactComponent.data";
import ContactsSectionUi from "@/app/features/contacts-section-ui";
import "./index.scss";

const Contacts = () => {
  return <ContactsSectionUi data={data} />
}

export default Contacts;