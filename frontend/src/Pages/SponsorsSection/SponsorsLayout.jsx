import Banner from "../../components/Banner/Banner";
import SponsorsSection from "./SponsorsSection";

export default function SponsorsLayout() {
  return (
    <>
      <Banner
        title={"Sponsors"}
        breadcrumb={<>Home / Pages / Sponsors</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <SponsorsSection />
    </>
  );
}
