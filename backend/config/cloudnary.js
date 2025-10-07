require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: "shazz", // hardcoded cloud name here
  api_key: "865413922431847",
  api_secret: "FGohdqwB6ftpbM6aOtf3d8Tm7CI",
});

cloudinary.api
  .ping()
  .then((res) => {
    console.log("✅ Cloudinary connected:", res);
  })
  .catch((err) => {
    console.error("❌ Cloudinary error:", err);
  });
// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mamta", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
