import Banner from "../../components/Banner/Banner";
import BlogPage from "./BlogPage";

export default function BlogLayout() {
  return (
    <>
      <Banner
        title={"Blog"}
        breadcrumb={<>Home / Blog</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />

      <BlogPage />
    </>
  );
}
