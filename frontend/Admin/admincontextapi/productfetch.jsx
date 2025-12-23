import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../../api/api";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext); // custom hook

export const AdminProvider = ({ children }) => {
  const token = localStorage.getItem("admintoken");
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  //   const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const prodRes = await API.get("/products/adminshowproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   const orderRes = await API.get("/orders/admin", {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });
      setProducts(prodRes.data.products);
      setTotalProducts(prodRes.data.total);
      //   setOrders(orderRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  return (
    <AdminContext.Provider
      value={{
        products,
        totalProducts,
        loading,
        setProducts,
        fetchAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
