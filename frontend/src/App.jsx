import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Eager load HomeLayout for fastest First Contentful Paint
import HomeLayout from "./Pages/HomePage/HomeLayout";

// Lazy load non-home routes for code-splitting and small initial bundle size
const AboutLayout = lazy(() => import("./Pages/AboutPage/AboutLayout"));
const GamingLayout = lazy(() => import("./Pages/GamingGallerySection/GamingLayout"));
const FAQLayout = lazy(() => import("./Pages/FAQSection/FAQLayout"));
const LiveStreeamLayout = lazy(() => import("./Pages/ArenaLiveStreams/LiveStreeamLayout"));
const SponsorsLayout = lazy(() => import("./Pages/SponsorsSection/SponsorsLayout"));
const TeamLayout = lazy(() => import("./Pages/TeamPage/TeamLayout"));
const ContactLayout = lazy(() => import("./Pages/ContactSection/ContactLayout"));
const PrivacyPolicyLayout = lazy(() => import("./Pages/PrivacyPolicy/PrivacyPolicyLayout"));
const RegisterLayout = lazy(() => import("./Pages/RegisterPage/RegisterLayout"));
const LoginLayout = lazy(() => import("./Pages/LoginPage/LoginLayout"));
const TermsLayout = lazy(() => import("./Pages/TermsPage/TermsLayout"));
const ShopLayout = lazy(() => import("./Pages/ShopPage/ShopLayout"));
const ProductLayout = lazy(() => import("./Pages/ShopPage/ProductLayout"));
const BlogLayout = lazy(() => import("./Pages/BlogPage/BlogLayout"));
const BlogDetailsLayout = lazy(() => import("./Pages/BlogPage/BlogDetailsLayout"));
const TournamentLayout = lazy(() => import("./Pages/TournamentSection/TournamentLayout"));
const CartLayout = lazy(() => import("./Pages/CartPage/CartLayout"));
const CheckoutLayout = lazy(() => import("./Pages/CheckoutPage/CheckoutLayout"));

// Admin pages lazy loaded
const AdminLayout = lazy(() => import("./Pages/Admin/AdminLayout"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard/Dashboard"));
const AdminOrders = lazy(() => import("./Pages/Admin/Orders/AdminOrders"));
const CreateProduct = lazy(() => import("./Pages/Admin/CreateProduct/CreateProduct"));
const AdminUsers = lazy(() => import("./Pages/Admin/AdminUsers/AdminUsers"));
const AdminCreateBlog = lazy(() => import("./Pages/Admin/BlogPage/AdminCreateBlog"));
const AdminAddAdvertisement = lazy(() => import("./Pages/Admin/AdminAddAdvertisement/AdminAddAdvertisement"));
const AdminContactMessages = lazy(() => import("./Pages/Admin/AdminContactMessages/AdminContactMessages"));
const AdminAddFAQ = lazy(() => import("./Pages/Admin/AdminAddFAQ/AdminAddFAQ"));
const AdminGallery = lazy(() => import("./Pages/Admin/AdminGallery/AdminGallery"));
const AdminLiveStream = lazy(() => import("./Pages/Admin/AdminLiveStream/AdminLiveStream"));
const AdminPrivacy = lazy(() => import("./Pages/Admin/AdminPrivacy/AdminPrivacy"));
const AdminSponsor = lazy(() => import("./Pages/Admin/AdminSponsor/AdminSponsor"));
const AdminTeam = lazy(() => import("./Pages/Admin/AdminTeam/AdminTeam"));
const AdminTerms = lazy(() => import("./Pages/Admin/AdminTerms/AdminTerms"));
const AdminTournament = lazy(() => import("./Pages/Admin/AdminTournament/AdminTournament"));

// Loading spinner fallback
const PageLoader = () => (
  <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/about" element={<AboutLayout />} />
          <Route path="/gallery" element={<GamingLayout />} />
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
          <Route path="/tournament" element={<TournamentLayout />} />
          <Route path="/cart" element={<CartLayout />} />
          <Route path="/checkout" element={<CheckoutLayout />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<CreateProduct />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="blogs" element={<AdminCreateBlog />} />
            <Route path="advertisement" element={<AdminAddAdvertisement />} />
            <Route path="contact" element={<AdminContactMessages />} />
            <Route path="faqs" element={<AdminAddFAQ />} />
            <Route path="galary" element={<AdminGallery />} />
            <Route path="live-stream" element={<AdminLiveStream />} />
            <Route path="privacy" element={<AdminPrivacy />} />
            <Route path="sponsor" element={<AdminSponsor />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="term" element={<AdminTerms />} />
            <Route path="tournament" element={<AdminTournament />} />
          </Route>
        </Routes>
      </Suspense>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
