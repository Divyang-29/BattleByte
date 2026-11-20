import Banner from "../../components/Banner/Banner";
import FAQSection from "./FAQSection";

export default function FAQLayout() {
  return (
    <>
      <Banner
        title={"FAQS"}
        breadcrumb={"Home / Pages / FAQS"}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <FAQSection />
    </>
  );
}
