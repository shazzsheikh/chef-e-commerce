import React, { useState } from "react";
import { API } from "../../api/api";

export const ProductForm = ({ setShowForm, setlocalproducts }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: [],
    clothType: "",
    brand: "",
    size: [], // array of sizes
    quantity: "",
    category: "",
    color: "",
    material: "",
    status: "",
    productdetails: [],
    specification: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "size") {
      // convert comma-separated sizes to array
      setProduct((prev) => ({
        ...prev,
        [name]: value.split(",").map((s) => s.trim()),
      }));
    } else if (e.target.type === "file") {
      const filesArray = Array.from(e.target.files);
      setProduct((prev) => ({
        ...prev,
        image: [...prev.image, ...filesArray],
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("clothType", product.clothType);
    formData.append("brand", product.brand);
    formData.append("quantity", product.quantity);
    formData.append("category", product.category);
    formData.append("color", product.color);
    formData.append("material", product.material);
    formData.append("status", product.status);
    // File
    if (product.image && product.image.length > 0) {
      product.image.forEach((file) => {
        formData.append("image", file); // same field name for all
      });
    }
    // Arrays - convert to JSON strings
    formData.append("size", JSON.stringify(product.size));
    // Convert textarea values (dot-separated strings) to arrays, then to JSON
    const productdetailsArray =
      typeof product.productdetails === "string"
        ? product.productdetails
            .split(".")
            .map((s) => s.trim())
            .filter(Boolean)
        : product.productdetails;

    const specificationArray =
      typeof product.specification === "string"
        ? product.specification
            .split(".")
            .map((s) => s.trim())
            .filter(Boolean)
        : product.specification;

    formData.append("productdetails", JSON.stringify(productdetailsArray));
    formData.append("specification", JSON.stringify(specificationArray));

    try {
      const res = await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("product add");
      console.log(res.data);
      setlocalproducts((prev) => [...prev, res.data.product]);
      // setShowForm(false);
      setProduct({
        name: "",
        price: "",
        description: "",
        image: [],
        clothType: "",
        brand: "",
        size: [], // array of sizes
        quantity: "",
        category: "",
        color: "",
        material: "",
        status: "",
        productdetails: [],
        specification: [],
      });
    } catch (error) {
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
      console.error("Error creating product", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded bg-gray-50 mb-6"
      >
        {/* Basic Fields */}
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
          multiple
          className="border p-2 rounded"
          onChange={handleChange} // you’ll handle this separately
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded col-span-1 md:col-span-1"
          value={product.description}
          onChange={handleChange}
        />
        <input
          type="Number"
          name="quantity"
          placeholder="number of stock"
          className="border p-2 rounded"
          value={product.quantity}
          onChange={handleChange}
        />
        {/* New Cloth-related Fields */}
        <select
          name="clothType"
          className="border p-2 rounded"
          value={product.clothType}
          onChange={handleChange}
          required
        >
          <option value="">Select Cloth Type</option>
          <option value="chef-coat">Chef-Coat</option>
          <option value="apron">Apron</option>
          <option value="chef-hat">Chef-Hat</option>
          <option value="bow">Bow</option>
          <option value="t-Shirt">T-shirt</option>
          <option value="shirt">shirts</option>
          <option value="pant">Pants</option>
          <option value="shoes">Shoes</option>
          <option value="other">other</option>
        </select>

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          className="border p-2 rounded"
          value={product.brand}
          onChange={handleChange}
        />

        <input
          type="text"
          name="size"
          placeholder="Size (comma separated e.g. S,M,L)"
          className="border p-2 rounded"
          value={product.size.join(", ")}
          onChange={handleChange}
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          className="border p-2 rounded"
          value={product.color}
          onChange={handleChange}
        />

        <input
          type="text"
          name="material"
          placeholder="Material (e.g. Cotton)"
          className="border p-2 rounded"
          value={product.material}
          onChange={handleChange}
        />
        <select
          name="status"
          placeholder="active , stop"
          className="border p-2 rounded"
          value={product.status}
          onChange={handleChange}
          required
        >
          <option value="">status</option>
          <option value="active">Active</option>
          <option value="stop">Stop</option>
        </select>
        <textarea
          name="productdetails"
          placeholder="productdetails please add multiple through to the , seprated "
          className="border p-2 rounded col-span-1 md:col-span-2"
          value={product.productdetails}
          onChange={handleChange}
        />
        <textarea
          name="specification"
          placeholder="specification they are sepreated by the , remember that"
          className="border p-2 rounded col-span-1 md:col-span-2"
          value={product.specification}
          onChange={handleChange}
        />

        {/* Buttons */}
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
      {product.image.length > 0 &&
        product.image.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Preview ${index}`}
            className="w-24 h-24 object-cover mt-2 mr-2 rounded border inline-block"
          />
        ))}
    </>
  );
};
