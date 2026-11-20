import Banner from "../../components/Banner/Banner";
import GamingGallerySection from "../GamingGallerySection/GamingGallerySection";
import GrowingStatsSection from "./GrowingStatsSection/GrowingStatsSection";
import LiveStreamingSection from "./LiveStreamingSection/LiveStreamingSection";
import WhoWeAreSection from "./WhoWeAreSection/WhoWeAreSection";

export default function AboutLayout() {
  return (
    <>
    <Banner title={"About Us"} breadcrumb={
        <>Home / Pages / About Us</>
    } bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}/>
    <WhoWeAreSection/>
    <GrowingStatsSection/>
    <LiveStreamingSection/>
    </>
  )
}