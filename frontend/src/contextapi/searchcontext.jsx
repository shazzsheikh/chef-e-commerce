import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../../api/api"; // tumhara API setup

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext); // custom hook

export const SearchProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 1️⃣ Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products/publicshowproducts");
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // 2️⃣ Filter products based on search query
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    const mergedProducts = allProducts.all || [];
    const results = mergedProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  }, [query, allProducts]);

  return (
    <SearchContext.Provider
      value={{
        allProducts,
        query,
        setQuery,
        filteredProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
