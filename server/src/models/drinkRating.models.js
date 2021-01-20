const mongoose = require("mongoose");

const drinkRatingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    drinkId: {type: Number, required: true, min: 0},
    rating: {type: Number, required: true, min: 0, max: 5},
});

module.exports = DrinkRating = mongoose.model("drinkRating", drinkRatingSchema);