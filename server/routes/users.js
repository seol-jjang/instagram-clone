const express = require("express");
const router = express.Router();
const request = require("request");
const { User } = require("../models/User");
const { Follow } = require("../models/Follow");
const { Like } = require("../models/Like");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { Scrap } = require("../models/Scrap");
const { auth } = require("../middleware/auth");
const { upload } = require("./upload");

router.post(
  "/uploadProfileImage",
  auth,
  upload.single("attachment"),
  (req, res) => {
    if (req.file) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { profileImage: req.file.location },
        (err, user) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).send({
            success: true
          });
        }
      );
    } else {
      return res.json({ success: false });
    }
  }
);

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
  if (req.body.sns_id) {
    User.findOne(
      { sns_id: req.body.sns_id, sns_type: req.body.sns_type },
      (err, user) => {
        if (!user) {
          const user = new User(req.body);
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("x_auth", user.token).status(200).json({
              loginSuccess: true,
              userId: user._id
            });
          });
        } else {
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("x_auth", user.token).status(200).json({
              loginSuccess: true,
              userId: user._id
            });
          });
        }
      }
    );
  } else {
    //요청된 이메일이 데이터베이스에 있는지 확인
    User.findOne({ email: req.body.email, sns_type: null }, (err, user) => {
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
            message: "입력된 정보가 잘못되었습니다. 다시 확인해주세요."
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
  }
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
    profileImage: req.user.profileImage,
    sns_type: req.user.sns_type
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
  User.findOne(
    { nickname: req.body.nickname },
    { name: true, nickname: true, profileImage: true },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({
          success: false
        });
      }
      return res.json({
        success: true,
        user
      });
    }
  );
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

router.post("/randomUser", auth, (req, res) => {
  const userId = [];
  Follow.find({ userFrom: req.user._id }, { userTo: true }, (err, user) => {
    if (err) return res.json({ success: false, err });
    user.map((user) => userId.push(user.userTo));
    User.find(
      { _id: { $nin: [...userId, req.user._id] } },
      { password: false, token: false, email: false }
    )
      .limit(3)
      .exec((err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
          user
        });
      });
  });
});

router.post("/edit", auth, (req, res) => {
  User.findOne({ nickname: req.body.nickname }, (err, user) => {
    if (user) {
      return res.json({
        success: false,
        message: "이미 존재하는 사용자 이름입니다."
      });
    } else {
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
    }
  });
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

router.post("/removeUser", auth, (req, res) => {
  function deleteData() {
    Follow.deleteMany({
      $or: [{ userFrom: req.user._id }, { userTo: req.user._id }]
    })
      .then(() => {
        return Scrap.deleteMany({ userFrom: req.user._id });
      })
      .then(() => {
        return Comment.deleteMany({ userFrom: req.user._id });
      })
      .then(() => {
        return Like.deleteMany({ userId: req.user._id });
      })
      .then(() => {
        return Post.deleteMany({ userFrom: req.user._id });
      })
      .then(() => {
        return User.deleteOne({ _id: req.user._id });
      })
      .then(() => {
        res.status(200).json({
          success: true
        });
      })
      .catch((err) => res.status(400).json({ success: false, err }));
  }

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (req.user.sns_type === "naver") {
      const accessToken = encodeURI(req.body.token);
      const url = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${accessToken}&service_provider=NAVER`;

      let options = {
        url: url,
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET
        }
      };
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          if (body.result === "success") {
            deleteData();
          } else {
            res.status(response.statusCode).json({
              success: false,
              message: "계정 해지를 실패했습니다."
            });
          }
        } else {
          res.status(response.statusCode).json({
            success: false,
            error,
            message: "계정 해지를 실패했습니다."
          });
        }
      });
    } else if (req.user.sns_type === "kakao") {
      deleteData();
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            success: false,
            message: "비밀번호가 일치하지 않습니다."
          });
        }
        deleteData();
      });
    }
  });
});

module.exports = router;
