// import React, { useEffect } from "react";
// import Header from "./layout/header";
// import Footer from "./layout/footer";
// import Home from "./pages/Home";
// // import About from "./pages/About";
// // import Contact from "./pages/Contact";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// useEffect(() => {
//  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate data fetching or any loading
//     const timer = setTimeout(() => setLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);
// const AppRoutes = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Header />
//         <main className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} /> */}
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default AppRoutes;
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
import { Head } from "../Admin/layout/Dashboard";
import Adminlogin from "../Admin/component/signin";
import ProductManager from "../Admin/component/product";
import { AdminOrders } from "../Admin/component/adminorders";
import Layout from "../Admin/layout/layout";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// funciton for public route
function PublicLayout() {
  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
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
          <Route path="/checkout" element={<Summarypage />} />
          <Route path="/admin/login" element={<Adminlogin />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<Head />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="orders" element={<AdminOrders />} />
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
