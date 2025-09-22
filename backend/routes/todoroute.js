const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  markTaskComplete,
} = require("../controllers/todocontroller.js");

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.patch("/:id/complete", markTaskComplete);

router.delete("/:id", deleteTask);

module.exports = router;
