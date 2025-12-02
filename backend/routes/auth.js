const express = require("express");
const {loginValidator, adminValidator, signupValidator} = require("../middlewares/authvalidation.js");
const router = express.Router();
const tokenverify = require("../middlewares/usertokenverify.js");
const {
  Login,
  signup,
  adminlogin,
  Getaddress,
  Addaddress,
} = require("../controllers/auth.js");

router.post("/login",loginValidator, Login);

router.get("/user/address/:id", Getaddress); //get address

router.patch("/user/:id/address", Addaddress); //address update on user profile

router.post("/",signupValidator, signup);

router.post("/admin/login",adminValidator, adminlogin);

module.exports = router;
