const express = require("express");
const router = express.Router();
const { Scrap } = require("../models/Scrap");

router.post("/addScrap", (req, res) => {
  let variable = { postId: req.body.postId, userFrom: req.body.userId };

  const scrap = new Scrap(variable);

  scrap.save((err, result) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
router.post("/removeScrap", (req, res) => {
  let variable = { postId: req.body.postId, userFrom: req.body.userId };

  Scrap.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

router.post("/getScrap", (req, res) => {
  Scrap.find({ userFrom: req.body.userFrom })
    .sort({ createdAt: -1 })
    .populate("postId")
    .exec((err, scrap) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        success: true,
        scrap
      });
    });
});

module.exports = router;
