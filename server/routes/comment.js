const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("userFrom")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getCommentsLimit", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("userFrom")
    .limit(2)
    .sort({ createdAt: -1 })
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("userFrom")
    .sort({ createdAt: 1 })
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/getCommentsCount", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("userFrom")
    .sort({ createdAt: -1 })
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, commentCount: comments.length });
    });
});

module.exports = router;
