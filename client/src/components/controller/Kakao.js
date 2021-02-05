import React from "react";
import KakaoLogin from "react-kakao-login";

function Kakao({ kakaoLoginHandler }) {
  return (
    <>
      <KakaoLogin
        token={process.env.REACT_APP_KAKAO_API_KEY}
        buttonText="카카오로 로그인"
        onSuccess={kakaoLoginHandler}
        onFail={console.error}
        onLogout={console.info}
      />
    </>
  );
}

export default Kakao;
