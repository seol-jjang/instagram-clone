const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");

router.post("/getLikes", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getPostLikes", (req, res) => {
  Like.find({ postId: req.body.postId }).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likesNumber: likes.length });
  });
});

router.post("/plusLike", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const like = new Like(variable);

  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/unLike", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(variable).exec((err, likeResult) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

module.exports = router;
