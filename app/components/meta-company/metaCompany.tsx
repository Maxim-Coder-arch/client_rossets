import { metaCompanyData as data } from "@/data/metaCompany.data";
import MetaCompanyUi from "@/app/features/meta-company-ui";
import "./index.scss";

const MetaCompany = () => {
  return <MetaCompanyUi data={data} />
}

export default MetaCompany;