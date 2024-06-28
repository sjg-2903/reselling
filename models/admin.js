const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    role: { type: String },
    // Add other fields as needed
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
