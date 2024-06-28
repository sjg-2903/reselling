const Task = require("../../models/task");

async function deleteTaskHandler(req, res) {
  try {
    // Extract the task ID from the request parameters
    const taskId = req.query.taskid;
console.log("taskId",taskId)
    // Check if the task exists
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found", status: false });
    }

    // If the task exists, delete it
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully", status: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = deleteTaskHandler;
