import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { registerUser } from "../../../_actions/user_action";
import logo from "../../../assets/instagram_logo.png";
import Input from "../../../styles/common/Input";
import Button from "../../../styles/common/Button";
import styled, { keyframes } from "styled-components";
import { palette } from "../../../styles/Theme";

const RegisterPage = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const submitBtn = useRef();
  const loadingBtn = useRef();
  //const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;
  //const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const emailRegExp = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  const nickNameRegExp = /^[0-9a-z]([0-9a-z_.])*/i;

  const onSubmit = (data) => {
    const lowerNickname = data.nicknameInput.toLowerCase();
    const body = {
      email: data.emailInput,
      name: data.nameInput,
      nickname: lowerNickname,
      password: data.passwordInput
    };
    submitBtn.current.classList.add("hide");
    loadingBtn.current.classList.remove("hide");
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        setTimeout(() => {
          props.history.push("/login");
        }, 1300);
      } else {
        alert(response.payload.message);
        submitBtn.current.classList.remove("hide");
        loadingBtn.current.classList.add("hide");
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
            ref={register({
              required: true,
              pattern: emailRegExp
            })}
            placeholder="이메일"
          />
          {errors.emailInput && errors.emailInput.type === "required" && (
            <ErrorText>이메일을 입력해주세요</ErrorText>
          )}
          {errors.emailInput && errors.emailInput.type === "pattern" && (
            <ErrorText>유효하지 않은 이메일형식입니다.</ErrorText>
          )}
          <Input
            type="text"
            name="nameInput"
            maxLength="30"
            ref={register}
            placeholder="성명"
          />
          <Input
            type="text"
            name="nicknameInput"
            minLength="3"
            maxLength="30"
            ref={register({
              required: true,
              maxLength: 30,
              minLength: 3,
              pattern: nickNameRegExp
            })}
            placeholder="사용자 이름"
          />
          {errors.nicknameInput && errors.nicknameInput.type === "required" && (
            <ErrorText>사용자이름을 입력해주세요</ErrorText>
          )}
          {errors.nicknameInput &&
            (errors.nicknameInput.type === "pattern" ||
              errors.nicknameInput.type === "minLength" ||
              errors.nicknameInput.type === "maxLength") && (
              <ErrorText>
                3~30자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다
              </ErrorText>
            )}
          <Input
            type="password"
            name="passwordInput"
            ref={register({ required: true, minLength: 6 })}
            placeholder="비밀번호"
          />
          {errors.passwordInput && errors.passwordInput.type === "required" && (
            <ErrorText>유효하지 않은 비밀번호입니다.</ErrorText>
          )}
          {errors.passwordInput &&
            errors.passwordInput.type === "minLength" && (
              <ErrorText>비밀번호는 최소 6자 이상이어야 합니다.</ErrorText>
            )}
          <Button type="submit" ref={submitBtn}>
            가입
          </Button>
          <Button blur ref={loadingBtn} className="hide">
            <Loading>
              <AiOutlineLoading />
            </Loading>
          </Button>
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
  margin-top: 60px;
  padding: 20px 40px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  &:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding: 25px 40px;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  .hide {
    display: none;
  }
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

const ErrorText = styled.p`
  margin-bottom: 5px;
  color: red;
  font-size: 14px;
`;

const Rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const Loading = styled.span`
  svg {
    animation: ${Rotation} 1s linear infinite;
  }
`;
