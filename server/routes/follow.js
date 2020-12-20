const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Follow } = require("../models/Follow");

router.post("/followerNumber", (req, res) => {
  Follow.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec(
    (err, follow) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        followerNumber: follow.length
      });
    }
  );
});
router.post("/followingNumber", (req, res) => {
  Follow.find({ userFrom: req.body.userFrom }).exec((err, follow) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      followingNumber: follow.length
    });
  });
});

router.post("/followed", (req, res) => {
  Follow.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec(
    (err, follow) => {
      if (err) return res.status(400).send(err);
      let result = false;
      if (follow.length !== 0) {
        result = true;
      }
      res.status(200).json({ success: true, followed: result });
    }
  );
});

router.post("/unfollow", (req, res) => {
  Follow.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.post("/following", (req, res) => {
  const follow = new Follow(req.body);
  follow.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
