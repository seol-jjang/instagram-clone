const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Follow } = require("../models/Follow");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { Like } = require("../models/Like");
const { Scrap } = require("../models/Scrap");
const { upload } = require("./upload");

router.post("/uploadImage", upload.array("attachment"), (req, res) => {
  if (req.files) {
    const images = req.files;
    const path = images.map((image) => image.location);
    return res.json({ success: true, path: path });
  } else {
    return res.json({ success: false });
  }
});

router.post("/uploadPost", (req, res) => {
  const post = new Post(req.body);
  post.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/getPosts", (req, res) => {
  Post.find()
    .populate("userFrom")
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, posts });
    });
});

router.get("/getFollowingPosts", auth, (req, res) => {
  const userFrom = [];
  Follow.find({ userFrom: req.user._id }, { userFrom: true }).exec(
    (err, users) => {
      if (err) return res.status(400).send(err);
      users.map((user) => userFrom.push(user.userFrom));
      Post.find({ userFrom: { $in: [...userFrom, req.user._id] } })
        .populate("userFrom")
        .sort({ createdAt: -1 })
        .exec((err, posts) => {
          console.log(posts);
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, posts });
        });
    }
  );
});
//userfrom 으로 find 후 userTo로 find response

router.post("/getUserPost", (req, res) => {
  Post.find({ userFrom: req.body.userFrom })
    .sort({ createdAt: -1 })
    .exec((err, post) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        success: true,
        post: post,
        postLength: post.length
      });
    });
});

router.post("/getPostDetail", (req, res) => {
  Post.findOne({ _id: req.body.postId })
    .populate("userFrom")
    .exec((err, post) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        success: true,
        post: post
      });
    });
});

router.post("/removePost", (req, res) => {
  const commentId = [];
  Post.findOneAndDelete({ _id: req.body.postId }).exec((err, post) => {
    if (err) return res.status(400).json({ success: false, err });
    Like.deleteMany({ postId: req.body.postId })
      .then((result) => {
        Scrap.deleteMany({ postId: req.body.postId })
          .then((result) => {
            Comment.find({ postId: req.body.postId }).exec((err, comment) => {
              if (err) return res.status(400).json({ success: false, err });
              comment.map((comment) => commentId.push(comment.commentId));
              Comment.deleteMany({ postId: req.body.postId })
                .then((result) => {
                  Like.deleteMany({ commentId: { $nin: commentId } })
                    .then((result) => {
                      res.status(200).json({
                        success: true
                      });
                    })
                    .catch((err) =>
                      res.status(400).json({ success: false, err })
                    );
                })
                .catch((err) => res.status(400).json({ success: false, err }));
            });
          })
          .catch((err) => res.status(400).json({ success: false, err }));
      })
      .catch((err) => res.status(400).json({ success: false, err }));
  });
});

module.exports = router;
