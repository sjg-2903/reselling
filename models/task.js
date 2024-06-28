const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    assignDate: { type: String },
    title: { type: String },
    empName: { type: String },
    status: { type: String },
    submissionDate: { type: String },
    // Add other fields as needed
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
