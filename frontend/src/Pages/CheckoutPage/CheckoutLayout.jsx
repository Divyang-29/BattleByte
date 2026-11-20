import Banner from "../../components/Banner/Banner";
import CheckoutPage from "./CheckoutPage";

export default function CheckoutLayout() {
  return (
    <>
      <Banner
        title={"Checkout"}
        breadcrumb={<>Home / Products / Checkout</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <CheckoutPage />
    </>
  );
}
