const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/user.models");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    let { email, password, verifiedPassword, firstName, lastName } = req.body;

    //check

    if (!email || !password || !verifiedPassword || !firstName || !lastName)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    if (password != verifiedPassword)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    if (firstName.length < 2)
      return res.status(400).json({
        msg: "The first name needs to be at least 2 characters long.",
      });
    if (lastName.length < 2)
      return res
        .status(400)
        .json({ msg: "The last name needs to be at least 2 characters long." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "This email is already in use." });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check
    if (!email || !password)
      res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      res
        .status(400)
        .json({ msg: "An user with this email have not been registered." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "The password is incorrect." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_GENERATED_PWD);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/isTokenValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_GENERATED_PWD);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}); 

module.exports = router;
