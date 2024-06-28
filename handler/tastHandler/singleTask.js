const Task = require("../../models/task");

async function getTaskByIdHandler(req, res) {
  try {
    const taskId = req.query.taskId;

    // Find task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found", status: false });
    }

    res.status(200).json({ task, status: true });
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = getTaskByIdHandler;
