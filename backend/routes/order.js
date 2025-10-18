const express = require("express");
const router = express.Router();
const { Setorder, Getorder, Updatestatus } = require("../controllers/order.js");

router.post("/", Setorder);

router.get("/", Getorder);

router.put("/:orderId/status", Updatestatus);

module.exports = router;
