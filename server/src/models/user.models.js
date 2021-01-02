const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    firstName: {type: String, required: true, minlength: 2},
    lastName: {type: String, required: true, minlength: 2},
});

module.exports = User = mongoose.model("user", userSchema);