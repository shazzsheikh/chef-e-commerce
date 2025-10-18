import React, { useState } from "react";
import { ProductForm } from "./productform";
import { API } from "../../api/api";
import { useEffect } from "react";
const ProductManager = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = localStorage.getItem("admintoken");
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [localproducts, setlocalproducts] = useState([]);
  const filteredlocalproducts = localproducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prob = await API.get("/products/adminshowproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setlocalproducts(prob.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleview = async (id) => {
    const view = localproducts.find((prev) => prev._id === id);
    setSelectedProduct(view);
  };
  const handleedit = async (id) => {};
  const handledelete = async (id) => {
    try {
      const res = await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        alert("Product deleted successfully ✅");
        setlocalproducts((prev) => prev.filter((prod) => prod._id !== id));
      } else {
        alert("failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Something went wrong while deleting the product.");
    }
  };

  return (
    <>
      <div className="md:p-6 p-2 bg-white rounded shadow my-3">
        {/* Top bar: Search + Add Product */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search products by name "
            className="border px-3 py-2 rounded w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => setShowForm(true)}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <ProductForm
            setShowForm={setShowForm}
            setlocalproducts={setlocalproducts}
          />
        )}
      </div>
      {/* Product Table */}
      <div className="overflow-x-auto my-6 mx-3">
        {filteredlocalproducts.length > 0 ? (
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Cloth Type</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Color</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredlocalproducts.map((prod) => (
                <tr key={prod._id} className="text-center">
                  <td className="border p-2">
                    {prod.image ? (
                      <img
                        src={prod.image[0]}
                        alt={prod.name}
                        className="h-12 mx-auto"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border p-2">{prod.name}</td>
                  <td className="border p-2">₹{prod.price}</td>
                  <td className="border p-2">{prod.clothType}</td>
                  <td className="border p-2">{prod.size.join(", ")}</td>
                  <td className="border p-2">{prod.color}</td>
                  <td
                    className={`border p-2 ${
                      prod.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {prod.status}
                  </td>
                  <td className="border">
                    <div className="flex p-2 space-x-0.5 justify-center">
                      <button
                        className="btn-card bg-secondary/80"
                        onClick={() => handleview(prod._id)}
                      >
                        View
                      </button>{" "}
                      <button
                        className="btn-card bg-secondary/80"
                        onClick={() => handleedit(prod._id)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="btn-card bg-red-700/80"
                        onClick={() => handledelete(prod._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No localproducts found.</p>
        )}
      </div>
      {selectedProduct && (
        <View view={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
};

export default ProductManager;

const View = ({ view, onClose }) => {
  if (!view) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-[90%] max-w-xl max-h-[90vh] overflow-y-auto">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* ✅ Product Details */}
        <h2 className="text-2xl font-bold mb-4 text-center">Product Details</h2>

        {/* Images */}
        {view.image && view.image.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center mb-4">
            {view.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product Image ${index + 1}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        {/* Text Details */}
        <div className="space-y-4 text-sm sm:text-base">
          {/* Two-column fields */}
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <p className="w-1/2">
              <strong>Name:</strong> {view.name}
            </p>
            <p className="w-1/2">
              <strong>Price:</strong> ₹{view.price}
            </p>
            <p className="w-1/2">
              <strong>Description:</strong> {view.description}
            </p>
            <p className="w-1/2">
              <strong>Cloth Type:</strong> {view.clothType}
            </p>
            <p className="w-1/2">
              <strong>Brand:</strong> {view.brand || "-"}
            </p>
            <p className="w-1/2">
              <strong>Size:</strong> {view.size?.join(", ") || "-"}
            </p>
            <p className="w-1/2">
              <strong>Quantity:</strong> {view.quantity}
            </p>
            <p className="w-1/2">
              <strong>Category:</strong> {view.category || "-"}
            </p>
            <p className="w-1/2">
              <strong>Color:</strong> {view.color}
            </p>
            <p className="w-1/2">
              <strong>Material:</strong> {view.material}
            </p>
            <p className="w-1/2">
              <strong>Status:</strong>{" "}
              <span
                className={
                  view.status === "active" ? "text-green-600" : "text-red-600"
                }
              >
                {view.status}
              </span>
            </p>
          </div>

          {/* Full width Product Details */}
          {view.productdetails?.length > 0 && (
            <div className="w-full">
              <strong>Product Details:</strong>
              <ul className="list-disc list-inside">
                {view.productdetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Full width Specifications */}
          {view.specification?.length > 0 && (
            <div className="w-full">
              <strong>Specifications:</strong>
              <ul className="list-disc list-inside">
                {view.specification.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
