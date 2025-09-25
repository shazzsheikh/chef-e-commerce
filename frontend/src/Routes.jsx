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
  useLocation,
  Outlet,
} from "react-router-dom";
import HomeSkeletonLoader from "./components/skelatonloader";
import ItemDetails from "./pages/itemsdetails";
import Summarypage from "./pages/summarypage";

// Import shadcn skeleton (adjust import path as per your setup)
import { Head } from "../Admin/layout/head";
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
      <Outlet />
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
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            // <PrivateRoute>
            //   <AdminLayout />
            // </PrivateRoute>
            <AdminLayout />
          }
        >
          <Route index element={<Head />} />
          {/* <Route path="products" element={<AdminProducts />} /> */}
        </Route>

        {/* Auth route */}
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Optional 404 page */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
