import Banner from "../../components/Banner/Banner";
import BlogDetails from "./BlogDetails";

export default function BlogDetailsLayout() {
  return (
    <>
      <Banner
        title={"Blog Details"}
        breadcrumb={<>Home / Blog Details</>}
        bgImage={"https://i.ytimg.com/vi/kGdOHQCD_QE/maxresdefault.jpg"}
      />
      <BlogDetails/>
    </>
  );
}
