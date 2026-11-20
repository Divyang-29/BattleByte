import Banner from "../../components/Banner/Banner";
import TermsPage from "./TermsPage";

export default function TermsLayout() {
  return (
    <>
      <Banner
        title={"Terms Of Service"}
        breadcrumb={<>Home / Terms Of Service</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <TermsPage />
    </>
  );
}
