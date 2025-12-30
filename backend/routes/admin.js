const express = require("express");
const router = express.Router();
const {
    adminUserprofile,
    EditadminProfile,
} = require("../controllers/admin.js");

router.get("/getadminprofile", adminUserprofile); //get admin profile
router.patch("/profile/:id", EditadminProfile); //update admin profile
module.exports = router;
