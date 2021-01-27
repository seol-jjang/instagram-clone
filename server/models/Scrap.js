const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  { timestamps: true }
);

const Scrap = mongoose.model("Scrap", scrapSchema);

module.exports = { Scrap };
