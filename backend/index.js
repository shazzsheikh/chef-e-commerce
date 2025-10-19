const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./server.js");
const usertokenverify = require("./middlewares/usertokenverify.js");

// const { upload } = require("./utils/cloudconnection.js");
const app = express();
app.use(
  cors({
    origin: "https://chef-e-commerce.vercel.app", // your frontend URL
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
      "HEAD",
      "CONNECT",
      "TRACE",
    ],
    credentials: true, // if you use cookies/auth
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/auth.js"));
app.use("/api/auth", require("./routes/auth.js"));

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
