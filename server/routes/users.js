const express = require("express");
const router = express.Router();
const multer = require("multer");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads_profileImage/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jpeg") {
      return cb(
        res
          .status(400)
          .end("jpg, png, jpeg 형식의 이미지만 업로드할 수 있습니다."),
        false
      );
    }
    cb(null, true);
  }
});

let upload = multer({ storage: storage }).single("file");

router.post("/uploadProfileImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    User.findOneAndUpdate(
      { _id: req.user._id },
      { profileImage: res.req.file.path },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        });
      }
    );
  });
});

router.post("/register", (req, res) => {
  //회원가입 시 필요한 정보를 client에서 받아오고 DB에 저장
  const user = new User(req.body);
  user.checkEmail(req.body.email, function (err, result) {
    if (result !== null) {
      return res.json({
        success: false,
        message: "이미 가입 된 이메일입니다."
      });
    }
    user.checkNickname(req.body.nickname, function (err, result) {
      if (result !== null) {
        return res.json({
          success: false,
          message: "이미 존재하는 사용자 이름입니다."
        });
      }
      user.save((err, doc) => {
        if (err) {
          return res.json({ success: false, err });
        }
        return res.status(200).json({ success: true });
      });
    });
  });
});

router.post("/login", (req, res) => {
  //요청된 이메일이 데이터베이스에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message:
          "입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요."
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      //확인했다면 비밀번호가 일치하는 지 확인
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "잘못된 비밀번호입니다. 다시 확인하세요."
        });
      }
      //일치한다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          nickname: user.nickname
        });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  //middleware 통과
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? true : false,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    nickname: req.user.nickname,
    role: req.user.role,
    profileImage: req.user.profileImage
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

router.post("/searchUser", (req, res) => {
  User.findOne({ nickname: req.body.nickname }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false
      });
    }
    return res.json({
      success: true,
      userData: {
        _id: user._id,
        name: user.name,
        nickname: user.nickname,
        profileImage: user.profileImage
      }
    });
  });
});

router.post("/matchUser", async function (req, res) {
  let options;
  options = [
    { nickname: new RegExp(req.body.value, "gi") },
    { name: new RegExp(req.body.value, "gi") }
  ];
  await User.find(
    { $or: options },
    { nickname: true, name: true, profileImage: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        user
      });
    }
  );
});

router.post("/edit", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { nickname: req.body.nickname, name: req.body.name },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  );
});

router.post("/editPassword", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    user.comparePassword(req.body.prevPassword, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          success: false,
          message: "이전 비밀번호가 일치하지 않습니다."
        });
      }
      user.updatePassword(req.body.newPassword, (err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        });
      });
    });
  });
});

module.exports = router;
