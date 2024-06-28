const Task = require("../../models/task");

async function AddTaskHandler(req, res) {
  try {
    const { assignDate, title, empName, status, submissionDate } = req.body;
    
    // Check if Task with provided title already exists
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return res.status(400).json({ message: "Task already exists", status: false });
    }

    // If Task doesn't exist, create a new Task
    const task = new Task({ assignDate, title, empName, status, submissionDate });
    await task.save();
    res
      .status(201)
      .json({ message: "Task Add successfully", status: true });
  } catch (error) {
    console.error("Error adding Task:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = AddTaskHandler;
