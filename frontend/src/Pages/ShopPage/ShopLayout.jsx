import Banner from "../../components/Banner/Banner";
import ShopPage from "./ShopPage";

export default function ShopLayout() {
  return (
    <>
      <Banner
        title={"Products List"}
        breadcrumb={<>Home / Products / Products List</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <ShopPage/>
    </>
  );
}
