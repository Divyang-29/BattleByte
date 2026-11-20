import Banner from "../../components/Banner/Banner";
import RegisterPage from "./RegisterPage";

export default function RegisterLayout() {
  return (
    <>
      <Banner
        title={"My Account"}
        breadcrumb={<>Home / Register</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <RegisterPage />
    </>
  );
}
