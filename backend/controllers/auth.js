const auth = require("../models/authmodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get all tasks
exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secretkey", // Make sure to set this in env
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "loging error" });
    console.error("Error fetching tasks:", error);
  }
};
// Create a new task
exports.signup = async (req, res) => {
  const { name, email, phonenumber, password, address } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newSignup = new auth({
      name,
      email,
      phonenumber,
      password: hash,
      address,
    });
    await newSignup.save();
    res.status(201).json(newSignup);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
    console.error("Error creating task:", error);
  }
};
// Update a task
exports.updateprofile = async (req, res) => {
  const { id } = req.params;
  const { taskname, date } = req.body;
  try {
    const updatedTask = await Todotask.findByIdAndUpdate(
      id,
      { taskname, date },
      { new: true } // to return the updated document
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
    console.error("Error updating task:", error);
  }
};
// Delete a task
exports.deleteprofile = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Todotask.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
    console.error("Error deleting task:", error);
  }
};
