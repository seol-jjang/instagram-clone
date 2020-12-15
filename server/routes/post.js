const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jpeg" || ext !== ".gif") {
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
    const path = images.map((image) => image.filename);
    return res.json({ success: true, path: path });
  });
});

module.exports = router;
