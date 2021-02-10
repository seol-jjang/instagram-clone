import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../../_actions/user_action";
const { naver } = window;

function NaverLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: {
        color: "green",
        type: 1,
        height: 50
      }
    });

    const getNaverToken = () => {
      if (!location.hash) return;
      const token = location.hash.split("=")[1].split("&")[0];
      setToken(token);
    };

    const NaverLoginHander = (email, id) => {
      const body = {
        email: email,
        sns_id: id,
        sns_type: "naver"
      };
      dispatch(loginUser(body)).then((response) => {
        if (response.payload.loginSuccess) {
          localStorage.setItem("ls", response.payload.userId);
          history.push(`/`);
        } else {
          alert("네이버 계정으로 로그인하는 데 실패했습니다");
        }
      });
    };

    naverLogin.init();
    getNaverToken();

    if (token !== "") {
      naverLogin.getLoginStatus((status) => {
        if (status) {
          const email = naverLogin.user.getEmail();
          const id = naverLogin.user.getId();
          NaverLoginHander(email, id);
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    }
  }, [dispatch, history, location.hash, token]);

  return <div id="naverIdLogin" />;
}

export default NaverLogin;