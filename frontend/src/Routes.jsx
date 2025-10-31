import React, { useState, useEffect } from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import HomeSkeletonLoader from "./components/skelatonloader";
import ItemDetails from "./pages/itemsdetails";
import Summarypage from "./pages/summarypage";

// Import shadcn skeleton (adjust import path as per your setup)
import UserDashboard from "../Admin/layout/Dashboard";
import Adminlogin from "../Admin/component/signin";
import ProductManager from "../Admin/component/product";
import { AdminOrders } from "../Admin/component/adminorders";
import Layout from "../Admin/layout/layout";
import { Viewsall } from "./pages/viewsall";
import { Myorder } from "./pages/myorder";
import { Touch } from "../Admin/component/touch";
import OurStory from "./pages/ourstory";
import Contact from "./pages/contactus";
import TermOfUse from "./pages/termofuse";
import { SearchProvider, useSearch } from "./contextapi/searchcontext";
import SearchProduct from "./component/serachproduct";
import BulkOrder from "./pages/bulkorder";
import Faq from "./pages/faq";
import EditProfile from "./pages/editprofile";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// function for public route
function PublicLayout() {
  const { query } = useSearch();
  return (
    <>
      <Header />
      <main className="content">{query ? <SearchProduct /> : <Outlet />}</main>
      {/* <main className="content relative">
        <Outlet />
        {query && (
          <div className="absolute top-0 left-0 w-full z-50 bg-white max-h-full overflow-y-auto shadow">
            <SearchProduct />
          </div>
        )}
      </main> */}

      <Footer />
    </>
  );
}
//function for private route

function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* Maybe admin sidebar */}
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Show shadcn Skeleton loading UI
    return <HomeSkeletonLoader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/products" element={<Products />} /> */}
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/home/checkout" element={<Summarypage />} />
          <Route path="/myorders" element={<Myorder />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="home/viewsproducts" element={<Viewsall />} />
          <Route path="home/ourstory" element={<OurStory />} />
          <Route path="home/contactus" element={<Contact />} />
          <Route path="home/termsofuse" element={<TermOfUse />} />
          <Route path="home/bulkorder" element={<BulkOrder />} />
          <Route path="home/frequently-asked-questions" element={<Faq />} />
          <Route path="/admin/login" element={<Adminlogin />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<UserDashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="getintouch" element={<Touch />} />
          </Route>
        </Route>

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("admintoken"); // ya koi auth context se check karo

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};
