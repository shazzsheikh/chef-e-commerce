import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../../api/api";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext); // custom hook

export const AdminProvider = ({ children }) => {
  const token = localStorage.getItem("admintoken");
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const prodRes = await API.get("/products/adminshowproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orderRes = await API.get("/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(prodRes.data.products);
      setTotalProducts(prodRes.data.total);
      setOrders(orderRes.data.orders);
      setTotalOrders(orderRes.data.totalorder);
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
        orders,
        setOrders,
        totalOrders,
        setProducts,
        fetchAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
