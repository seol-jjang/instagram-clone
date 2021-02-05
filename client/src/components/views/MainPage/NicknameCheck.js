import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import Button from "../../../styles/common/Button";
import Input from "../../../styles/common/Input";
import { palette, SubText, ErrorText } from "../../../styles/Theme";
import { editUser } from "../../../_actions/user_action";

function NicknameCheck() {
  const {
    register,
    errors,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm();
  const dispatch = useDispatch();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(null);
  const nickNameRegExp = /^[0-9a-z]([0-9a-z_])*/i;

  useEffect(() => {
    if (dirtyFields.nicknameInput) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [dirtyFields.nicknameInput]);

  const onSubmit = (data) => {
    const lowerNickname = data.nicknameInput.toLowerCase();
    const body = {
      nickname: lowerNickname
    };
    setLoading(true);
    dispatch(editUser(body)).then((response) => {
      if (response.payload.success) {
        setLoading(false);
        window.location.reload();
      } else {
        alert(response.payload.message);
        setLoading(false);
      }
    });
  };

  return (
    <CheckSection>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <h2>사용자 이름을 정해주세요</h2>
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
        <SmallText>
          3~30자의 영문 소문자, 숫자와 밑줄(_)만 사용 가능합니다.
        </SmallText>
        {errors.nicknameInput &&
          (errors.nicknameInput.type === "pattern" ||
            errors.nicknameInput.type === "minLength" ||
            errors.nicknameInput.type === "maxLength") && (
            <ErrorText>형식에 맞지 않습니다.</ErrorText>
          )}
        {loading ? (
          <Button blur>
            <IconSpan>
              <AiOutlineLoading />
            </IconSpan>
          </Button>
        ) : (
          <Button type="submit" blur={!btnDisabled}>
            제출
          </Button>
        )}
      </FormContainer>
    </CheckSection>
  );
}

export default NicknameCheck;

const CheckSection = styled.section`
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;
const FormContainer = styled.form`
  z-index: 2;
  width: 400px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: white;
  border-radius: 10px;
  font-size: 14px;
  h2 {
    padding: 15px 0 30px;
    font-weight: bold;
    font-size: 20px;
    color: ${palette.blackColor};
  }
  button,
  input {
    width: 100%;
  }
`;

const SmallText = styled(SubText)`
  width: 280px;
  text-align: center;
  word-break: keep-all;
  margin-bottom: 20px;
  font-size: 10px;
`;

const Rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const IconSpan = styled.span`
  svg {
    animation: ${Rotation} 1s linear infinite;
  }
`;
