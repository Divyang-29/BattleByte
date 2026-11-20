import Banner from "../../components/Banner/Banner";
import GamingGallerySection from "./GamingGallerySection";

export default function GamingLayout() {
  return (
    <>
      <Banner
        title={"Gallery"}
        breadcrumb={<>Home / Pages / Gallery</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <GamingGallerySection/>
    </>
  );
}
