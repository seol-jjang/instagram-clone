import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { loginUser } from "../../../_actions/user_action";
import logo from "../../../assets/instagram_logo.png";
import Input from "../../../styles/common/Input";
import Button from "../../../styles/common/Button";
import { palette, ErrorText } from "../../../styles/Theme";
import Kakao from "../../controller/Kakao";

const LoginPage = (props) => {
  const {
    register,
    errors,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm();
  const dispatch = useDispatch();
  const [loginFailMessage, setLoginFailMessage] = useState();
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (dirtyFields.emailInput && dirtyFields.passwordInput) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [dirtyFields.emailInput, dirtyFields.passwordInput]);

  const onSubmitHandler = (data) => {
    const body = {
      email: data.emailInput,
      password: data.passwordInput
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        localStorage.setItem("ls", response.payload.userId);
        props.history.push(`/`);
      } else {
        setLoginFailMessage(response.payload.message);
      }
    });
  };

  const kakaoLoginHandler = (resData) => {
    const body = {
      email: resData.profile.kakao_account.email,
      sns_id: resData.profile.id,
      sns_type: "kakao"
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        localStorage.setItem("ls", response.payload.userId);
        props.history.push(`/`);
      } else {
        alert("카카오 계정으로 로그인하는 데 실패했습니다");
      }
    });
  };

  return (
    <>
      <Section>
        <Link to="/">
          <Logo>instagram</Logo>
        </Link>
        <LoginForm onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            type="email"
            id="emailInput"
            name="emailInput"
            placeholder="이메일"
            ref={register({ required: true })}
          />
          {errors.emailInput && errors.emailInput.type === "required" && (
            <ErrorTextLogin>이메일을 입력해주세요</ErrorTextLogin>
          )}
          <Input
            type="password"
            name="passwordInput"
            ref={register({ required: true })}
            placeholder="비밀번호"
          />
          {errors.passwordInput && errors.passwordInput.type === "required" && (
            <ErrorTextLogin>비밀번호를 입력해주세요</ErrorTextLogin>
          )}
          <Button type="submit" blur={!btnDisabled}>
            로그인
          </Button>
        </LoginForm>
        {loginFailMessage && (
          <ErrorTextLogin className="login-error">
            {loginFailMessage}
          </ErrorTextLogin>
        )}
      </Section>
      <Section smallbox>
        <Span>계정이 없으신가요?</Span>
        <Link to="/accounts" replace>
          <AccountBtn>가입하기</AccountBtn>
        </Link>
        <Kakao kakaoLoginHandler={kakaoLoginHandler} />
      </Section>
    </>
  );
};

export default withRouter(LoginPage);

const Section = styled.section`
  max-width: 350px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 20px 40px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  ${(props) =>
    props.smallbox &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      padding: 25px 40px;
      span {
        font-size: 15px;
        margin-bottom: 20px;
      }
      button {
        margin: 10px 0 0;
      }
    `}
  .login-error {
    margin-top: 7px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h1`
  width: 175px;
  height: 51px;
  margin: 20px auto 40px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  color: transparent;
  overflow: hidden;
  text-indent: 110%;
`;

const Span = styled.span`
  font-size: 15px;
`;

const AccountBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: ${palette.ActivatedColor};
  font-size: 15px;
  font-weight: bold;
`;

const ErrorTextLogin = styled(ErrorText)`
  margin-bottom: 5px;
  color: red;
  font-size: 14px;
  text-align: center;
  line-height: 1.4;
  word-break: keep-all;
`;
