const { naver } = window;

const Naver = () => {
  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
    isPopup: false /* 팝업을 통한 연동처리 여부 */,
    loginButton: {
      color: "green",
      type: 3,
      height: 60
    } /* 로그인 버튼의 타입을 지정 */
  });
  naverLogin.init();
};
