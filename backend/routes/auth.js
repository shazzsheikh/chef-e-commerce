const express = require("express");
const router = express.Router();
const tokenverify = require("../middlewares/usertokenverify.js");
const {
  Login,
  signup,
  adminlogin,
  Getaddress,
  Addaddress,
} = require("../controllers/auth.js");

router.post("/login", Login);

router.get("/user/address/:id", Getaddress); //get address

router.patch("/user/:id/address", Addaddress); //address update on user profile

router.post("/", signup);

router.post("/admin/login", adminlogin);

module.exports = router;
