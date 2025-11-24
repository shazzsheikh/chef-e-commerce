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
    // Step 3: Save to DB
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

exports.Adminshowproducts = async (req, res) => {
  try {
    const products = await product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("error fetching products", error);
    res.status(500).json({ message: "server error" });
  }
};

exports.Publicshowproducts = async (req, res) => {
  try {
    const productsall = await product
      .find()
      .select("name price image clothType size")
      .sort({ createdAt: -1 });
    //all categaries nikala
    const categories = await product.distinct("clothType");
    // result mein find kr liya filer ke hisab se
    const result = await Promise.all(
      categories.map((cat) =>
        product
          .find({ clothType: cat })
          .select("name price image clothType size")
          .sort({ createdAt: -1 })
      )
    );
    // data mein json mein store krenge sare product
    const data = {
      all: productsall,
    };
    categories.forEach((cat, index) => {
      data[cat] = result[index];
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
          console.log(`🗑️ Deleted: ${public_id}`, result);
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
