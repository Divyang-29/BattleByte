import ActiveTeam from "./ActiveTeam/ActiveTeam";
import HeroSection from "./HeroSection/HeroSection";
import JoinCommunity from "./JoinCommunity/JoinCommunity";
import LatestNews from "./LatestNews/LatestNews";
import LiveStreaming from "./LiveStreaming/LiveStreaming";
import PastTournaments from "./PastTournaments/PastTournaments";
import ProductsSection from "./ProductsSection/ProductsSection";
import UpcomingTournaments from "./UpcomingTournaments/UpcomingTournaments";

export default function HomeLayout() {
  return (
  <>
  <HeroSection/>
  <LatestNews/>
  <LiveStreaming/>
  <UpcomingTournaments/>
  <ActiveTeam/>
  <PastTournaments/>
  <JoinCommunity/>
  <ProductsSection/>
  </>
  )
}