const Todotask = require("../models/todomodel.js");
// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Todotask.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
    console.error("Error fetching tasks:", error);
  }
};
// Create a new task
exports.createTask = async (req, res) => {
  const { taskname, date } = req.body;
  const newTask = new Todotask({ taskname, date });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
    console.error("Error creating task:", error);
  }
};
// Update a task
exports.updateTask = async (req, res) => {
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
exports.deleteTask = async (req, res) => {
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

exports.markTaskComplete = async (req, res) => {
  const { id } = req.params;
  try {
    const completedTask = await Todotask.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!completedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(completedTask);
  } catch (error) {
    res.status(500).json({ message: "Error marking task as complete" });
    console.error("Error marking task as complete:", error);
  }
};
