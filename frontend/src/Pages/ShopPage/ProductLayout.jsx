import ProductDetails from "./ProductDetails";
import Banner from "../../components/Banner/Banner";
export default function ProductLayout() {
  return (
    <>
      <Banner
        title={"Products Details"}
        breadcrumb={<>Home / Products / Products Details</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <ProductDetails />
    </>
  );
}
