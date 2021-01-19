const mongoose = require("mongoose");

const averageDrinkRatingSchema = new mongoose.Schema({
    drinkId: {type: Number, required: true, min: 0},
    globalRate: {type: Number, required: true, min: 0},
    numberOfRatings: {type: Number, required: true, min: 0},
});

module.exports = AverageDrinkRating = mongoose.model("averageDrinkRating", averageDrinkRatingSchema);