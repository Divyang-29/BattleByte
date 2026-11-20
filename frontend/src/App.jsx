import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomeLayout from "./Pages/HomePage/HomeLayout";
import Footer from "./components/Footer/Footer";
import AboutLayout from "./Pages/AboutPage/AboutLayout";
import GamingLayout from "./Pages/GamingGallerySection/GamingLayout";
import FAQLayout from "./Pages/FAQSection/FAQLayout";
import LiveStreeamLayout from "./Pages/ArenaLiveStreams/LiveStreeamLayout";
import SponsorsLayout from "./Pages/SponsorsSection/SponsorsLayout";
import TeamLayout from "./Pages/TeamPage/TeamLayout";
import ContactLayout from "./Pages/ContactSection/ContactLayout";
import PrivacyPolicyLayout from "./Pages/PrivacyPolicy/PrivacyPolicyLayout";
import RegisterLayout from "./Pages/RegisterPage/RegisterLayout";
import LoginLayout from "./Pages/LoginPage/LoginLayout";
import TermsLayout from "./Pages/TermsPage/TermsLayout";
import ShopLayout from "./Pages/ShopPage/ShopLayout";
import ProductLayout from "./Pages/ShopPage/ProductLayout";
import BlogLayout from "./Pages/BlogPage/BlogLayout";
import BlogDetailsLayout from "./Pages/BlogPage/BlogDetailsLayout";
import TournamentLayout from "./Pages/TournamentSection/TournamentLayout";
import CartLayout from "./Pages/CartPage/CartLayout";
import CheckoutLayout from "./Pages/CheckoutPage/CheckoutLayout";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AdminOrders from "./Pages/Admin/Orders/AdminOrders";
import CreateProduct from "./Pages/Admin/CreateProduct/CreateProduct";
import AdminUsers from "./Pages/Admin/AdminUsers/AdminUsers";
import AdminCreateBlog from "./Pages/Admin/BlogPage/AdminCreateBlog";
import AdminAddAdvertisement from "./Pages/Admin/AdminAddAdvertisement/AdminAddAdvertisement";
import AdminContactMessages from "./Pages/Admin/AdminContactMessages/AdminContactMessages";
import AdminAddFAQ from "./Pages/Admin/AdminAddFAQ/AdminAddFAQ";
import AdminGallery from "./Pages/Admin/AdminGallery/AdminGallery";
import AdminLiveStream from "./Pages/Admin/AdminLiveStream/AdminLiveStream";
import AdminPrivacy from "./Pages/Admin/AdminPrivacy/AdminPrivacy";
import AdminSponsor from "./Pages/Admin/AdminSponsor/AdminSponsor";
import AdminTeam from "./Pages/Admin/AdminTeam/AdminTeam";
import AdminTerms from "./Pages/Admin/AdminTerms/AdminTerms";
import AdminTournament from "./Pages/Admin/AdminTournament/AdminTournament";
import GamingGallerySection from "./Pages/GamingGallerySection/GamingGallerySection";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin")
  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/about" element={<AboutLayout />} />
        <Route path="/gallery" element={<GamingLayout/>} />
        <Route path="/faqs" element={<FAQLayout />} />
        <Route path="/live-stream" element={<LiveStreeamLayout />} />
        <Route path="/sponsors" element={<SponsorsLayout />} />
        <Route path="/team" element={<TeamLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        <Route path="/privacy" element={<PrivacyPolicyLayout />} />
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/register" element={<RegisterLayout />} />
        <Route path="/terms" element={<TermsLayout />} />
        <Route path="/product" element={<ShopLayout />} />
        <Route path="/product/:id" element={<ProductLayout />} />
        <Route path="/blogs" element={<BlogLayout />} />
        <Route path="/blog/:id" element={<BlogDetailsLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        <Route path="/tournament" element={<TournamentLayout />} />
        <Route path="/cart" element={<CartLayout />} />
        <Route path="/checkout" element={<CheckoutLayout />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="products" element={<CreateProduct/>}/>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="blogs" element={<AdminCreateBlog/>}/>
          <Route path="advertisement" element={<AdminAddAdvertisement/>}/>
          <Route path="contact" element={<AdminContactMessages/>}/>
          <Route path="faqs" element={<AdminAddFAQ/>}/>
          <Route path="galary" element={<AdminGallery/>}/>
          <Route path="live-stream" element={<AdminLiveStream/>}/>
          <Route path="privacy" element={<AdminPrivacy/>}/>
          <Route path="sponsor" element={<AdminSponsor/>}/>
          <Route path="team" element={<AdminTeam/>}/>
          <Route path="term" element={<AdminTerms/>}/>
          <Route path="tournament" element={<AdminTournament/>}/>
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
