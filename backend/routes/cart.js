const express = require("express");
const router = express.Router();
const {
  Setitems,
  Getitems,
  Deleteitem,
  Quantityupdate,
} = require("../controllers/cart.js");

router.post("/setitems", Setitems);

router.get("/getitems", Getitems);

router.patch("/updatequantity", Quantityupdate);

router.delete("/deleteitem/:productId", Deleteitem);
module.exports = router;
