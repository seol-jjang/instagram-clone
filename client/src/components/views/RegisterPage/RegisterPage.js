import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";
import logo from "../../../assets/instagram_logo.png";
import Input from "../../../styles/common/Input";
import Button from "../../../styles/common/Button";
import styled from "styled-components";
import { palette } from "../../../styles/Theme";

const RegisterPage = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

  const onSubmit = (data) => {
    const body = {
      email: data.emailInput,
      name: data.nameInput,
      nickname: data.nicknameInput,
      password: data.passwordInput
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert(response.payload.message);
      }
    });
  };

  return (
    <>
      <Section>
        <Logo>instagram</Logo>
        <LargeText>친구들의 사진과 동영상을 보려면 가입하세요.</LargeText>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            name="emailInput"
            ref={register({ required: true, pattern: emailRegExp })}
            placeholder="이메일"
          />
          {errors.emailInput && errors.emailInput.type === "required" && (
            <p>이메일을 입력해주세요</p>
          )}
          {errors.emailInput && errors.emailInput.type === "pattern" && (
            <p>유효하지 않은 이메일형식입니다.</p>
          )}
          <Input
            type="text"
            name="nameInput"
            ref={register}
            placeholder="성명"
          />
          <Input
            type="text"
            name="nicknameInput"
            ref={register({ required: true, maxLength: 30 })}
            placeholder="사용자 이름"
          />
          {errors.nicknameInput && errors.nicknameInput.type === "required" && (
            <p>사용자이름을 입력해주세요</p>
          )}
          <Input
            type="password"
            name="passwordInput"
            ref={register({ required: true, minLength: 6 })}
            placeholder="비밀번호"
          />
          {errors.passwordInput && errors.passwordInput.type === "required" && (
            <p>유효하지 않은 비밀번호입니다.</p>
          )}
          {errors.passwordInput &&
            errors.passwordInput.type === "minLength" && (
              <p>비밀번호는 최소 6자 이상이어야 합니다.</p>
            )}
          <Button type="submit">가입</Button>
        </RegisterForm>
        <SmallText>
          가입하면 Instagram의 <span>약관, 데이터 정책</span> 및{" "}
          <span>쿠키 정책</span>에 동의하게 됩니다.
        </SmallText>
      </Section>
      <Section>
        <Span>계정이 있으신가요?</Span>
        <Link to="/login" replace>
          <LoginBtn>로그인</LoginBtn>
        </Link>
      </Section>
    </>
  );
};

export default withRouter(RegisterPage);

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

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h1`
  width: 175px;
  height: 51px;
  margin: 20px auto 20px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  color: transparent;
  overflow: hidden;
  text-indent: 110%;
`;

const SmallText = styled.p`
  margin-top: 10px;
  font-size: 12px;
  color: ${palette.grayText};
  text-align: center;
  line-height: 1.4;
  word-break: keep-all;
  span {
    font-weight: bold;
  }
`;

const LargeText = styled.p`
  margin: 10px auto;
  font-size: 16px;
  color: #8e8e8e;
  text-align: center;
  line-height: 1.4;
  font-weight: bold;
  word-break: keep-all;
`;

const Span = styled.span`
  font-size: 15px;
`;
const LoginBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: ${palette.ActivatedColor};
  font-size: 15px;
  font-weight: bold;
`;
