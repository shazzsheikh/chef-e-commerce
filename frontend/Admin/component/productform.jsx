import React, { useEffect, useState } from "react";
import { API } from "../../api/api";
// import { formvalidation } from "../../utils/formvalidation";
import Loader from "../../src/component/Loader";

export const ProductForm = ({
  setShowForm,
  setlocalproducts,
  editProduct,
  setEditProduct,
}) => {
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
  const [errors, setErrors] = useState({});
  const [loader, setloader] = useState(false);
  const token = localStorage.getItem("admintoken");

  useEffect(() => {
    if (editProduct) {
      setProduct({
        name: editProduct.name || "",
        price: editProduct.price || "",
        description: editProduct.description || "",
        image: editProduct.image || [],
        clothType: editProduct.clothType || "",
        brand: editProduct.brand || "",
        size: editProduct.size || [],
        quantity: editProduct.quantity || "",
        category: editProduct.category || "",
        color: editProduct.color || "",
        material: editProduct.material || "",
        status: editProduct.status || "",
        productdetails: editProduct.productdetails?.join(". ") || "",
        specification: editProduct.specification?.join(". ") || "",
      });
    }
  }, [editProduct]);

  const handleCancel = () => {
    setShowForm(false);
    setEditProduct(null);
  };

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
      if (product.image.length + filesArray.length > 4) {
        setErrors((prev) => ({
          ...prev,
          image: "You can upload maximum 4 images only",
        }));
        return;
      }
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
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
    const validationErrors = formvalidation(product);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
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

    if (product.image && product.image.length > 0) {
      product.image.forEach((file) => {
        if (file instanceof File) {
          formData.append("image", file); // nayi file upload
        } else {
          formData.append("existingImages", file); // purani URLs
        }
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

    setloader(true);
    if (editProduct) {
      // Edit product logic
      try {
        const res = await API.patch(`/products/${editProduct._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("product updated");
        setlocalproducts((prev) =>
          prev.map((prod) =>
            prod._id === editProduct._id ? res.data.product : prod
          )
        );
        setShowForm(false);
        setEditProduct(null);
      } catch (error) {
        alert(
          "Error: " + JSON.stringify(error.response?.data || error.message)
        );
        console.error("Error updating product", error);
      } finally {
        setloader(false);
      }
    } else {
      // Create new product logic
      try {
        const res = await API.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("product add");
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
        alert(
          "Error: " + JSON.stringify(error.response?.data || error.message)
        );
        console.error("Error creating product", error);
      } finally {
        setloader(false);
      }
    }
  };
  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
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
              className="border p-2 rounded bg-white"
              value={product.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border p-2 rounded bg-white"
              value={product.price}
              onChange={handleChange}
              required
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="border p-2 rounded bg-white"
              value={product.category}
              onChange={handleChange}
            />

            <input
              type="file"
              name="image"
              multiple
              disabled={product.image.length >= 4}
              className="border p-2 rounded bg-white"
              onChange={handleChange}
              required={product.image.length === 0}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}

            <textarea
              name="description"
              placeholder="Description"
              className="border p-2 rounded col-span-1 md:col-span-1 bg-white"
              value={product.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
            <input
              type="Number"
              name="quantity"
              placeholder="number of stock"
              className="border p-2 rounded bg-white"
              value={product.quantity}
              onChange={handleChange}
              required
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
            {/* New Cloth-related Fields */}
            <select
              name="clothType"
              className="border p-2 rounded bg-white"
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
            {errors.clothType && (
              <p className="text-red-500 text-sm">{errors.clothType}</p>
            )}
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="border p-2 rounded bg-white"
              value={product.brand}
              onChange={handleChange}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand}</p>
            )}

            <input
              type="text"
              name="size"
              placeholder="Size (comma separated e.g. S,M,L)"
              className="border p-2 rounded bg-white"
              value={product.size.join(", ")}
              onChange={handleChange}
              required
            />
            {errors.size && (
              <p className="text-red-500 text-sm">{errors.size}</p>
            )}

            <input
              type="text"
              name="color"
              placeholder="Color"
              className="border p-2 rounded bg-white"
              value={product.color}
              onChange={handleChange}
              required
            />
            {errors.color && (
              <p className="text-red-500 text-sm">{errors.color}</p>
            )}
            <input
              type="text"
              name="material"
              placeholder="Material (e.g. Cotton)"
              className="border p-2 rounded bg-white"
              value={product.material}
              onChange={handleChange}
            />
            {errors.material && (
              <p className="text-red-500 text-sm">{errors.material}</p>
            )}
            <select
              name="status"
              placeholder="active , stop"
              className="border p-2 rounded bg-white"
              value={product.status}
              onChange={handleChange}
              required
            >
              <option value="">status</option>
              <option value="active">Active</option>
              <option value="stop">Stop</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
            <textarea
              name="productdetails"
              placeholder="Product Details please add multiple through to the .(dot) seprated "
              className="border p-2 rounded col-span-1 md:col-span-2 bg-white h-32"
              value={product.productdetails}
              onChange={handleChange}
              required
            />
            {errors.productdetails && (
              <p className="text-red-500 text-sm">{errors.productdetails}</p>
            )}
            <textarea
              name="specification"
              placeholder="Specification they are sepreated by the .(dot) remember that"
              className="border p-2 rounded col-span-1 md:col-span-2 bg-white h-32"
              value={product.specification}
              onChange={handleChange}
              required
            />
            {errors.specification && (
              <p className="text-red-500 text-sm">{errors.specification}</p>
            )}

            {/* Buttons */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleCancel()}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
          {/* {product.image.length > 0 &&
            product.image.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover mt-2 mr-2 rounded border inline-block"
              />
            ))} */}
          <div className="flex flex-wrap gap-3 mt-4">
            {product.image.map((img, index) => {
              const isFile = img instanceof File;

              return (
                <div
                  key={index}
                  className="relative w-24 h-24 group border rounded overflow-hidden"
                >
                  <img
                    src={isFile ? URL.createObjectURL(img) : img}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition ">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
const formvalidation = (data) => {
  const errors = {};
  if (!data.name.trim()) {
    errors.name = "Product name is required";
  }
  if (!data.price) {
    errors.price = "Price is required";
  } else if (Number(data.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }
  if (!data.quantity) {
    errors.quantity = "Quantity is required";
  } else if (Number(data.quantity) < 0) {
    errors.quantity = "Quantity cannot be negative";
  }
  if (!data.clothType) {
    errors.clothType = "Cloth type is required";
  }
  if (!data.brand.trim()) {
    errors.brand = "Brand is required";
  }
  if (!data.size || data.size.length === 0) {
    errors.size = "At least one size is required";
  }
  if (!data.color.trim()) {
    errors.color = "Color is required";
  }
  if (!data.material.trim()) {
    errors.material = "Material is required";
  }
  if (!data.status) {
    errors.status = "Status is required";
  }
  if (!data.image || data.image.length === 0) {
    errors.image = "At least one image is required";
  } else if (data.image.length > 4) {
    errors.image = "You can upload maximum 4 images only";
  }
  if (
    !data.productdetails ||
    (typeof data.productdetails === "string" && !data.productdetails.trim())
  ) {
    errors.productdetails = "Product details are required";
  }
  if (
    !data.specification ||
    (typeof data.specification === "string" && !data.specification.trim())
  ) {
    errors.specification = "Specification is required";
  }
  return errors;
};
