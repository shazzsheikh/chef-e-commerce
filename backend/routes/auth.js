const express = require("express");
const router = express.Router();
const { Login, signup } = require("../controllers/auth.js");

router.post("/login", Login);

router.post("/", signup);

module.exports = router;
