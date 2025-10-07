const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudnary.js");
const {
  Addproducts,
  Adminshowproducts,
  Deleteproduct,
  Publicshowproducts,
  Showproduct,
} = require("../controllers/product.js");

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

router.get("/adminshowproducts", Adminshowproducts);
router.post("/", upload.array("image", 4), Addproducts);
router.get("/publicshowproducts", Publicshowproducts);
router.get("/:id", Showproduct);
// router.get("/catagery", Catagaryfilter);
router.delete("/:id", Deleteproduct);

module.exports = router;
