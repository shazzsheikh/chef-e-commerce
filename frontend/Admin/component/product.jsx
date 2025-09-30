import React, { useState } from "react";

const ProductManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      id: Date.now(),
      imagePreview: product.image ? URL.createObjectURL(product.image) : null,
    };

    setProducts([newProduct, ...products]); // Add new product at top
    setShowForm(false);
    setProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      image: null,
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="md:p-6 p-2 bg-white rounded shadow my-3">
        {/* Top bar: Search + Add Product */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded bg-gray-50 mb-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="border p-2 rounded"
              value={product.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border p-2 rounded"
              value={product.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="border p-2 rounded"
              value={product.category}
              onChange={handleChange}
            />
            <input
              type="file"
              name="image"
              className="border p-2 rounded"
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="border p-2 rounded col-span-1 md:col-span-2"
              value={product.description}
              onChange={handleChange}
            />
            <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      {/* Product Table */}
      <div className="overflow-x-auto my-6 mx-3">
        {filteredProducts.length > 0 ? (
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="text-center">
                  <td className="border p-2">
                    {prod.imagePreview ? (
                      <img
                        src={prod.imagePreview}
                        alt={prod.name}
                        className="h-12 mx-auto"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border p-2">{prod.name}</td>
                  <td className="border p-2">₹{prod.price}</td>
                  <td className="border p-2">{prod.category}</td>
                  <td className="border p-2">{prod.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No products found.</p>
        )}
      </div>
    </>
  );
};

export default ProductManager;
