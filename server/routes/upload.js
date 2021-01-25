const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: process.env.REGION
});

let storage = multerS3({
  s3: s3,
  bucket: "pineapplegram-image",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `uploads/${Date.now()}_${file.originalname}`);
  }
});

exports.upload = multer({ storage: storage });
