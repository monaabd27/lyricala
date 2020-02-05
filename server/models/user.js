const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleid: String,
  highestWPM: Number,
  averageWPM: Number,
  gamesPlayed: Number,
  mostRecentSongs: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
