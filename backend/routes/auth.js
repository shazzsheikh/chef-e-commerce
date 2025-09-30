const express = require("express");
const router = express.Router();
const { Login, signup, adminlogin } = require("../controllers/auth.js");

router.post("/login", Login);

router.post("/", signup);

router.post("/admin/login", adminlogin);

module.exports = router;
