import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { loginUser } from "../../../_actions/user_action";
import logo from "../../../assets/instagram_logo.png";
import Input from "../../../styles/common/Input";
import Button from "../../../styles/common/Button";
import { palette } from "../../../styles/Theme";

const LoginPage = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [loginFailMessage, setLoginFailMessage] = useState();
  const dispatch = useDispatch();

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

  return (
    <>
      <Section>
        <Logo>instagram</Logo>
        <LoginForm onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            type="email"
            id="emailInput"
            name="emailInput"
            placeholder="이메일"
            ref={register({ required: true })}
          />
          {errors.emailInput && errors.emailInput.type === "required" && (
            <p style={{ color: "red", fontSize: "14px" }}>
              이메일을 입력해주세요
            </p>
          )}
          <Input
            type="password"
            name="passwordInput"
            ref={register({ required: true })}
            placeholder="비밀번호"
          />
          {errors.passwordInput && errors.passwordInput.type === "required" && (
            <p style={{ color: "red", fontSize: "14px" }}>
              비밀번호를 입력해주세요
            </p>
          )}
          <Button type="submit">로그인</Button>
        </LoginForm>
        {loginFailMessage && (
          <p style={{ color: "red", fontSize: "14px" }}>{loginFailMessage}</p>
        )}
      </Section>
      <Section>
        <Span>계정이 없으신가요?</Span>
        <Link to="/accounts" replace>
          <AccountBtn>가입하기</AccountBtn>
        </Link>
      </Section>
    </>
  );
};

export default withRouter(LoginPage);

const Section = styled.section`
  max-width: 350px;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  &:first-child {
    margin-top: 3rem;
    margin-bottom: 10px;
  }
  &:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 40px;
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
