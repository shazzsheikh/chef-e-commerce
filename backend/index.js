const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./server.js");
const usertokenverify = require("./middlewares/usertokenverify.js");

// const { upload } = require("./utils/cloudconnection.js");
const app = express();
const allowedOrigins = [
  "https://chef-e-commerce.vercel.app",
  "http://localhost:5173",
  "https://lineally-unenervated-eusebia.ngrok-free.dev",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin); // Yahan sahi origin return karo
      } else {
        callback(new Error("CORS policy: This origin is not allowed."));
      }
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/auth.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/forgetpassword", require("./routes/forgetpassword.js"));

app.use("/api/products", require("./routes/products.js"));
app.use("/api/cart", usertokenverify, require("./routes/cart.js"));

app.use("/api/order", usertokenverify, require("./routes/order.js"));

app.use("/api/getintouch", require("./routes/getintouch.js"));
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
});
