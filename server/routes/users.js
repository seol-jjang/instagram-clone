const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  //회원가입 시 필요한 정보를 client에서 받아오고 DB에 저장
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
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

module.exports = router;
