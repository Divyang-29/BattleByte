import Banner from "../../components/Banner/Banner";
import Tournaments from "./Tournaments";

export default function TournamentLayout() {
  return (
    <>
      <Banner
        title={"Tournament"}
        breadcrumb={<>Home / Tournament / Tournament</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <Tournaments/>
    </>
  );
}
