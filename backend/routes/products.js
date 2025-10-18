const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudnary.js");
const usertokenverify = require("../middlewares/usertokenverify.js");
const {
  Addproducts,
  Adminshowproducts,
  Deleteproduct,
  Publicshowproducts,
  Categoryfilter,
  Showproduct,
} = require("../controllers/product.js");

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

router.get("/adminshowproducts", usertokenverify, Adminshowproducts);
router.post("/", usertokenverify, upload.array("image", 4), Addproducts);
router.get("/publicshowproducts", Publicshowproducts);
router.get("/category/:category", Categoryfilter);
router.get("/:id", Showproduct);
// router.get("/catagery", Catagaryfilter);
router.delete("/:id", usertokenverify, Deleteproduct);

module.exports = router;
