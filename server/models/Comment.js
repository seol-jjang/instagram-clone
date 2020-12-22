const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
    content: {
      type: String
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
