import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../../_actions/user_action";
const { naver } = window;

function NaverLogin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const naverLogin = new naver.LoginWithNaverId(
      {
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
        isPopup: false,
        loginButton: {
          color: "green",
          type: 1,
          height: 50
        }
      },
      []
    );

    // const getNaverToken = () => {
    //   if (!location.hash) return;
    //   const token = location.hash.split("=")[1].split("&")[0];
    //   setToken(token);
    // };

    const NaverLoginHander = (email, id, token) => {
      const body = {
        email: email,
        sns_id: id,
        sns_type: "naver"
      };
      dispatch(loginUser(body)).then((response) => {
        if (response.payload.loginSuccess) {
          localStorage.setItem("ls", response.payload.userId);
          localStorage.setItem("naverToken", token);
          history.push(`/`);
        } else {
          alert("네이버 계정으로 로그인하는 데 실패했습니다");
        }
      });
    };

    naverLogin.init();
    naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log(naverLogin);
        const email = naverLogin.user.getEmail();
        const id = naverLogin.user.getId();
        const token = naverLogin.accessToken.accessToken;
        NaverLoginHander(email, id, token);
      }
    });
  }, [dispatch, history, location.hash]);

  return <div id="naverIdLogin" />;
}

export default NaverLogin;
