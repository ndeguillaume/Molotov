const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8},
    firstName: {type: String, required: true, minlength: 2},
    lastName: {type: String, required: true, minlength: 2},
    likedDrinks: {type: [Number]},
});

module.exports = User = mongoose.model("user", userSchema);