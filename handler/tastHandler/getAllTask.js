const Task = require("../../models/task");

async function GetAllTasksHandler(req, res) {
  try {
    // Query the database to retrieve all tasks
    const tasks = await Task.find();

    // Send the tasks as a response
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = GetAllTasksHandler;
