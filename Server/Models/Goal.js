const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;