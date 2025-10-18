const express = require("express");
const router = express.Router();
const { Set, Get } = require("../controllers/getintouch.js");
const usertokenverify = require("../middlewares/usertokenverify.js");

router.post("/", Set);

router.get("/", usertokenverify, Get);

module.exports = router;
