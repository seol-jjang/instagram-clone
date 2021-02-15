import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../../_actions/user_action";
import logo from "../../assets/kakao_icon.png";
const { Kakao } = window;

function KakaoLogin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const kakaoLoginClick = () => {
    Kakao.Auth.login({
      scope: "account_email",
      success: (auth) => {
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            kakaoLoginHandler(response.kakao_account.email, response.id);
          },
          fail: function (error) {
            console.log(error);
          }
        });
      },
      fail: (err) => {
        console.error(err);
      }
    });
  };

  const kakaoLoginHandler = (email, id) => {
    const body = {
      email: email,
      sns_id: id,
      sns_type: "kakao"
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        localStorage.setItem("ls", response.payload.userId);
        history.push(`/`);
      } else {
        alert("카카오 계정으로 로그인하는 데 실패했습니다");
      }
    });
  };
  return (
    <LoginButton onClick={kakaoLoginClick}>
      <Logo>kakao</Logo>
    </LoginButton>
  );
}

export default KakaoLogin;

const LoginButton = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cebb0c;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fee500;
  margin-right: 10px;
`;
const Logo = styled.h1`
  width: 28px;
  height: 25px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: transparent;
  overflow: hidden;
  text-indent: 110%;
`;
