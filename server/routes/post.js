const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Post } = require("../models/Post");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jpeg") {
      return cb(res.status(400).end("jpg, png, jpeg, gif"), false);
    }
    cb(null, true);
  }
});

let upload = multer({ storage: storage }).array("attachment");

router.post("/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    const images = res.req.files;
    const path = images.map((image) => image.path);
    return res.json({ success: true, path: path });
  });
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

router.post("/getUserPost", (req, res) => {
  Post.find({ userFrom: req.body.userFrom })
    .sort({ createdAt: -1 })
    .exec((err, post) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        success: true,
        post: post
      });
    });
});

router.post("/getUserPostCount", (req, res) => {
  Post.find({ userFrom: req.body.userFrom }).exec((err, post) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({
      success: true,
      postLength: post.length
    });
  });
});

module.exports = router;
