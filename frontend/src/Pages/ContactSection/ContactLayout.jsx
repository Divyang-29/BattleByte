import Banner from "../../components/Banner/Banner";
import ContactSection from "./ContactSection";

export default function ContactLayout() {
  return (
    <>
      <Banner
        title={"Contact Us"}
        breadcrumb={<>Home / Contact Us</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />

      <ContactSection />
    </>
  );
}
