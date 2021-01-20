const router = require("express").Router();
const AverageDrinkRating = require("../models/averageDrinkRating.models");

router.get("/", async (req, res) => {
  const averageDrinkRating = await AverageDrinkRating.find();
  let data = [];
  averageDrinkRating.forEach(function (object) {
    if (object.numberOfRatings > 0) {
      data.push({
        drinkId: object.drinkId,
        average: object.globalRate / object.numberOfRatings,
      });
    }
  });
  res.json(data);
});

router.get("/:drinkId", async (req, res) => {
  const drinkId = req.params.drinkId;
  const average = await AverageDrinkRating.findOne({
    drinkId: drinkId,
  });
  if (average != null && average.numberOfRatings != 0) {
    res.json({
      average: average.globalRate / average.numberOfRatings,
      numberOfRatings: average.numberOfRatings,
    });
  }
  res.json({
    average: 0,
    numberOfRatings: 0,
  });
});

module.exports = router;