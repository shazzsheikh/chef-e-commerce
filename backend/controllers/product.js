const product = require("../models/productmodel.js");
const { cloudinary } = require("../config/cloudnary.js");
const path = require("path");
exports.Addproducts = async (req, res) => {
  const {
    name,
    price,
    description,
    clothType,
    brand,
    quantity,
    category,
    color,
    material,
    status,
  } = req.body;
  
  try {
    const size = JSON.parse(req.body.size || "[]");
    const productdetails = JSON.parse(req.body.productdetails || "[]");
    const specification = JSON.parse(req.body.specification || "[]");
    const image = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];
    const newProduct = new product({
      name,
      price,
      description,
      image,
      clothType,
      brand,
      size,
      quantity,
      category,
      color,
      material,
      status,
      productdetails,
      specification,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

exports.Updateproducts = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    clothType,
    brand,
    quantity,
    category,
    color,
    material,
    status,
  } = req.body;

  try {
    const size = JSON.parse(req.body.size || "[]");
    const productdetails = JSON.parse(req.body.productdetails || "[]");
    const specification = JSON.parse(req.body.specification || "[]");
    
    const image = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];

    const updatedProduct = await product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        image: image.length > 0 ? image : undefined, // Only update if images are provided
        clothType,
        brand,
        size: size.length > 0 ? size : undefined, // Only update if sizes are provided
        quantity: quantity !== undefined ? quantity : undefined, // Only update if quantity is provided
        category: category !== undefined ? category : undefined, // Only update if category is provided
        color: color !== undefined ? color : undefined, // Only update if color is provided
        material: material !== undefined ? material : undefined, // Only update if material is provided
        status: status !== undefined ? status : undefined, // Only update if status is provided
        productdetails: productdetails.length > 0 ? productdetails : undefined, // Only update if product details are provided
        specification: specification.length > 0 ? specification : undefined, // Only update if specifications are provided
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

exports.Adminshowproducts = async (req, res) => {
  try {
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 20;   
    //  const skip = (page - 1) * limit;
    const products = await product.find().sort({ createdAt: -1 });
    // .skip(skip).limit(limit);
    //total count for pagination if needed
    const total = await product.countDocuments();
    // const totalPages = Math.ceil(total / limit);
    // res.status(200).json({ products, total, page, totalPages });
    res.status(200).json({ products, total });
    
  } catch (error) {
    console.error("error fetching products", error);
    res.status(500).json({ message: "server error" });
  }
};

exports.Publicshowproducts = async (req, res) => {
  try {
    const productsall = await product
      .find({ status: "active" }, "name price image clothType size")
      .sort({ createdAt: -1 });

      const data = {all: []};
    //all categaries nikala data phle
      productsall.forEach((p) => {
      data.all.push(p);
      if (!data[p.clothType]) {
        data[p.clothType] = [];
      }
      data[p.clothType].push(p);
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("error fetching products", error);
    res.status(500).json({ message: "server error" });
  }
};

exports.Showproduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productdetails = await product.findById(id);

    if (!productdetails) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productdetails);
  } catch (error) {
    console.error("error fetching products", error);
    res.status(500).json({ message: "server error" });
  }
};

exports.Deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteproduct = await product.findByIdAndDelete(id);
    if (!deleteproduct) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    //cloudinary se bhi image was delete
    if (deleteproduct.image && deleteproduct.image.length > 0) {
      for (const imageUrl of deleteproduct.image) {
        const filenameWithExt = path.basename(imageUrl); // abc123.jpg
        const filename = filenameWithExt.split(".")[0]; // abc123
        const public_id = `mamta/${filename}`;
        try {
          const result = await cloudinary.uploader.destroy(public_id);
        } catch (error) {
          console.error(`❌ Error deleting ${public_id}:`, error);
        }
      }
    }
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      product: deleteproduct,
    });
  } catch (error) {
    console.error("error deleting product", error);
    res.status(500).json({
      succes: false,
      message: "failed to delete product",
      error: error.message,
    });
  }
};

exports.Categoryfilter = async (req, res) => {
  const { category } = req.params;
  try {
    const productsByCategory = await product
      .find({ clothType: category })
      .select("name price image clothType size")
      .sort({ createdAt: -1 });
    res.status(200).json(productsByCategory);
  } catch (error) {
    console.error("error fetching products by category", error);
    res.status(500).json({ message: "server error" });
  }
};
