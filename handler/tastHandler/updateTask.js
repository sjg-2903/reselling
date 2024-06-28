const Task = require("../../models/task");

async function UpdateTaskHandler(req, res) {
  try {
    // const taskId = req.params.id; // Assuming the task ID is passed in the request parameters
    const {taskid, assignDate, title, empName, status, submissionDate } = req.body;
// console.log("taskId",req.params)
    // Find the task by ID
    const task = await Task.findById(taskid);
    if (!task) {
      return res.status(404).json({ message: "Task not found", status: false });
    }

    // Update task properties if provided
    if (assignDate) task.assignDate = assignDate;
    if (title) task.title = title;
    if (empName) task.empName = empName;
    if (status) task.status = status;
    if (submissionDate) task.submissionDate = submissionDate;

    // Save the updated task
    await task.save();

    res.status(200).json({ message: "Task updated successfully", status: true });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = UpdateTaskHandler;
