const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    // Add other fields as needed
});

const User = mongoose.model("user",userSchema);

module.exports = User;
