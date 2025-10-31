const express = require("express");
const router = express.Router();
const tokenverify = require("../middlewares/usertokenverify.js");
const {
  Userprofile,
    EditProfile,
  //   Getaddress,
  //   Addaddress,
} = require("../controllers/user.js");

router.get("/profile/:id", Userprofile); //get user profile

router.patch("/profile/:id", EditProfile); //update user profile

// router.get("/user/address/:id", Getaddress); //get address

// router.patch("/user/:id/address", Addaddress); //address update on user profile

// router.post("/", signup);

// router.post("/admin/login", adminlogin);

module.exports = router;
