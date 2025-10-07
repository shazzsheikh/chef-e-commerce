const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./server.js");

// const { upload } = require("./utils/cloudconnection.js");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
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

app.use("/api/products",require("./routes/products.js"));

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
});
