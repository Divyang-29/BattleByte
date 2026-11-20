import Banner from "../../components/Banner/Banner";
import CartPage from "./CartPage";

export default function CartLayout() {
  return (
    <>
      <Banner
        title={"Cart"}
        breadcrumb={<>Home / Products / Cart</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <CartPage />
    </>
  );
}
