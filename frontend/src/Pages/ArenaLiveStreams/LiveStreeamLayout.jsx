import Banner from "../../components/Banner/Banner";
import LiveStreamingSection from "../AboutPage/LiveStreamingSection/LiveStreamingSection";
import ArenaLiveStreams from "./ArenaLiveStreams";

export default function LiveStreeamLayout() {
  return (
    <>
      <Banner
        title={"Live Streaming"}
        breadcrumb={<>Home / Pages / Live Streaming</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <LiveStreamingSection />
      <ArenaLiveStreams />
    </>
  );
}
