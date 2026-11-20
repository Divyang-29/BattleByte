import Banner from "../../components/Banner/Banner";
import LoginPage from "./LoginPage";

export default function LoginLayout() {
  return (
    <>
      <Banner
        title={"My Account"}
        breadcrumb={<>Home / Login</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <LoginPage />
    </>
  );
}
