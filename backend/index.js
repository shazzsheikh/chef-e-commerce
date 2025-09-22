const express = require("express");

const cors = require("cors");
const { default: mongoose } = require("mongoose");
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

app.use("/api/todos", require("./routes/todoroute.js"));
mongoose
  .connect("mongodb://localhost:27017/todo1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb was connected successfully");
    app.listen(3000, () => {
      console.log("your port is running on this 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
