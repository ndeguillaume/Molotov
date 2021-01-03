const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server as started on port: ${PORT}`);
});

// Our DB Configuration

// Local
// require('./src/database');

// Online
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, 
(err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
});

// routes
app.use("/user", require("./src/routes/user.router"));
app.use("/likedDrinks", require("./src/routes/likedDrinks.router"));
app.use("/userRating", require("./src/routes/drinkRating.router"));



// // server.js <<< A CLEAN >>> (peut servir pour docker)
// const express = require('express');
// const path = require("path");

// const app = express();
// const bodyParser = require('body-parser');
// const PORT = 8080;

// // Our DB Configuration
// require('./src/database');

// // Routes
// const postRouter = require('./src/routes/post.router');

// const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
// app.use(bodyParser.json());

// // Static files
// app.use(express.static(CLIENT_BUILD_PATH));

// app.use('/posts', postRouter);

// // Server React Client
// app.get("/", function(req, res) {
//   res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
// });

// app.listen(PORT, function () {
//     console.log(`Server Listening on ${PORT}`);
// });

