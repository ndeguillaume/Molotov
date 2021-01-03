const router = require("express").Router();
const User = require("../models/user.models");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user.likedDrinks);
});

router.put("/:id", auth, async (req, res) => {
  try {
    const drinkId = req.params.id;
    const userId = req.user;

    //check
    if (!userId || !drinkId)
      res.status(400).json({ msg: "Information are missing." });

    const user = await User.findById(userId);
    if (!user) res.status(400).json({ msg: "The user does not exist." });
    const isLiked = await User.findOne({ likedDrinks: drinkId });
    if (isLiked) {
      await User.updateOne(
        { _id: userId },
        { $pull: { likedDrinks: drinkId } }
      );
    } else {
      await User.updateOne(
        { _id: userId },
        { $addToSet: { likedDrinks: drinkId } }
      );
    }
    const updatedUser = await User.findById(userId);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
