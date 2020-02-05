/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const { OAuth2Client } = require("google-auth-library");
const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

// router.post("/user", auth.ensureLoggedIn, (req, res) => {
//   const newUser = new User({
//     googleid: req.user._id,
//     highestWPM: 0,
//     allAverageWPM: [],
//     mostRecentSongs: [],
//   });

//   newUser.save().then((user) => res.send(user));
// });

router.post("/login", auth.login);
router.post("/logout", auth.logout);
//router.post("/user", auth.ensureLoggedIn);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});
// Users.find({ _id: this.props.userId }).then((user) => {
//   if (user.highestWPM < this.props.max) {
//     user.highestWPM = this.props.max;
//   }
//   let temp = user.allAverageWPM;
//   user.allaverageWPM = temp.concat([a]);
//   let temp2 = user.mostRecentSongs.shift();
//   user.mostRecentSongs = temp2.concat([this.props.game]);
//   user.save();
// });
router.post("/updateStats", (req, res) => {
  User.findOne({ _id: req.body.userId }).then((user) => {
    console.log("api call!", user);
    if (user.highestWPM < req.body.max) {
      user.highestWPM = req.body.max;
    }
    user.mostRecentSongs.push(req.body.game);
    if (user.mostRecentSongs.length > 3) {
      user.mostRecentSongs.shift();
    }
    let temp = user.averageWPM;
    user.averageWPM = Math.round((temp * user.gamesPlayed + req.body.avg) / (user.gamesPlayed + 1));
    temp2 = user.gamesPlayed;
    user.gamesPlayed = temp2 + 1;
    user.save();
  });
});

router.get("/stats", (req, res) => {
  //console.log(req.query.userId);
  User.findOne({ _id: req.query.userId }).then((user) => {
    //console.log("found a match");
    res.send(user);
  });
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
