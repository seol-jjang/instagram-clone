const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");
const { Like } = require("../models/Like");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("userFrom", "nickname profileImage")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getCommentsLimit", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("userFrom", "nickname profileImage")
    .limit(2)
    .sort({ createdAt: -1 })
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("userFrom", "nickname profileImage")
    .sort({ createdAt: 1 })
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/getCommentsCount", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("userFrom", "nickname profileImage")
    .sort({ createdAt: -1 })
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, commentCount: comments.length });
    });
});

router.post("/removeComment", (req, res) => {
  Comment.findOneAndDelete({ _id: req.body.commentId }).exec((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    Like.deleteMany({ commentId: req.body.commentId })
      .then((result) =>
        res.status(200).json({
          success: true,
          comment
        })
      )
      .catch((err) => res.status(400).json({ success: false, err }));
  });
});

module.exports = router;
