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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeSkeletonLoader from "./components/skelatonloader";
import ItemDetails from "./pages/itemsdetails";

// Import shadcn skeleton (adjust import path as per your setup)

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
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<div>Products Page</div>} />
            <Route path="/items/:id" element={<ItemDetails />} />
            {/* Other routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
