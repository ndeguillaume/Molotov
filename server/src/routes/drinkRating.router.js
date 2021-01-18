const router = require("express").Router();
const DrinkRating = require("../models/drinkRating.models");
const auth = require("../middleware/auth");

router.get("/all", auth, async (req, res) => {
  const userId = req.user;
  const drinkRating = await DrinkRating.find({
    userId: userId,
  });
  let data = [];
  drinkRating.forEach(function(object){
    data.push({
      rating: object.rating,
    drinkId: object.drinkId,
    });
  });
  res.json(data);
});

router.get("/:drinkId/averageRating", async (req, res) => {
  const drinkId = req.params.drinkId;
  const drinkRating = await DrinkRating.find({
    drinkId: drinkId,
  });
  let data = 0;
  let length = 0;
  drinkRating.forEach(function(object){
    data += object.rating;
    length ++;
  });
  let average = 0;
  if(length > 0)
    average = data/length;
  res.json({
    average: average,
    numberOfRatings: length,
  });
  
});

router.get("/:drinkId", auth, async (req, res) => {
  const drinkId = req.params.drinkId;
  const userId = req.user;
  const isRatingExisting = await DrinkRating.exists({
    userId: userId,
    drinkId: drinkId,
  });
  if (isRatingExisting) {
    const drinkRating = await DrinkRating.findOne({
      userId: userId,
      drinkId: drinkId,
    });
    res.json(drinkRating.rating);
  }
  res.json(null);
});

router.put("/:drinkId", auth, async (req, res) => {
  try {
    const { rating } = req.body;
    const drinkId = req.params.drinkId;
    const userId = req.user;
    //check
    if (!userId || !drinkId || !rating)
      res.status(400).json({ msg: "Information are missing." });
    if (rating < 0 || rating > 5)
      return res.status(400).json({ msg: "The rating is not valid." });
    const drinkRating = await DrinkRating.findOne({
      userId: userId,
      drinkId: drinkId,
    });
    if (!drinkRating) {
      return res
        .status(400)
        .json({ msg: "The drink has not been rated by the user yet." });
    }
    await DrinkRating.updateOne(
      { userId: userId, drinkId: drinkId },
      { $set: { rating: rating } }
    );
    const uptadedDrinkRating = await DrinkRating.findOne({
      userId: userId,
      drinkId: drinkId,
    });
    res.json(uptadedDrinkRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:drinkId", auth, async (req, res) => {
  try {
    const { rating } = req.body;
    const drinkId = req.params.drinkId;
    const userId = req.user;
    //check
    if (!userId || !drinkId || !rating)
      res.status(400).json({ msg: "Information are missing." });
    if (rating < 0 || rating > 5)
      return res.status(400).json({ msg: "The rating is not valid." });
    const drinkRating = await DrinkRating.findOne({
      userId: userId,
      drinkId: drinkId,
    });
    if (drinkRating)
      return res
        .status(400)
        .json({ msg: "The drink has already been rated by the user." });

    const newDrinkRating = new DrinkRating({
      userId,
      drinkId,
      rating,
    });

    const savedDrinkRating = await newDrinkRating.save();
    res.json(savedDrinkRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:drinkId", auth, async (req, res) => {
  try {
    const userId = req.user;
    const drinkId = req.params.drinkId;
    const drinkRating = await DrinkRating.findOneAndDelete({
      userId: userId,
      drinkId: drinkId,
    });
    res.json(drinkRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
