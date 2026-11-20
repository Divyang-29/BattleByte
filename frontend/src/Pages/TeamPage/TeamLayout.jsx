import Banner from "../../components/Banner/Banner";
import JoinCommunity from "../HomePage/JoinCommunity/JoinCommunity";
import ActiveTeamSection from "./ActiveTeamSection";

export default function TeamLayout() {
  return (
    <>
      <Banner
        title={"Our Team"}
        breadcrumb={<>Home / Pages / Our Team</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <ActiveTeamSection />
      <JoinCommunity />
    </>
  );
}
