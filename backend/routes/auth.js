const express = require("express");
const router = express.Router();
const {
  Login,
  signup,
  adminlogin,
  Getaddress,
  Addaddress,
} = require("../controllers/auth.js");

router.post("/login", Login);

router.get("/user/address/:id", Getaddress);

router.patch("/user/:id/address", Addaddress);

router.post("/", signup);

router.post("/admin/login", adminlogin);

module.exports = router;
