import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import Input from "../../../styles/common/Input";
import { Inner, palette, ProfileIcon, SubText } from "../../../styles/Theme";
import Button from "../../../styles/common/Button";
import { editUser } from "../../../_actions/user_action";
import { Link } from "react-router-dom";
import ProfileImageUpload from "../../utils/ProfileImageUpload";

function ProfileEditPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    errors,
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useForm();
  const nickNameRegExp = /^[0-9a-z]([0-9a-z_-])*/i;

  useEffect(() => {
    if (user.userData) {
      reset({
        nameInput: user.userData.name,
        nicknameInput: user.userData.nickname
      });
    }
  }, [reset, user.userData]);

  const onSubmit = (data) => {
    const lowerNickname = data.nicknameInput.toLowerCase();
    const body = {
      name: data.nameInput,
      nickname: lowerNickname
    };
    dispatch(editUser(body)).then((response) => {
      if (response.payload.success) {
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      } else {
        alert(response.payload.message);
      }
    });
  };

  return (
    <>
      <Inner>
        {user.userData && (
          <EditWrap>
            <MenuList>
              <Link to="/accounts/edit">
                <li className="current">프로필 편집</li>
              </Link>
              <Link to="/accounts/password/change">
                <li>비밀번호 변경</li>
              </Link>
            </MenuList>
            <EditContainer>
              <ImageContainer>
                <ProfileIcon size="medium">
                  <img
                    src={`http://localhost:5000/${user.userData.profileImage}`}
                    alt={user.userData.nickname}
                  />
                </ProfileIcon>
                <div>
                  <h3>{user.userData.nickname}</h3>
                  <form encType="multipart/form-data">
                    <ProfileImageUpload />
                  </form>
                </div>
              </ImageContainer>
              <EditForm onSubmit={handleSubmit(onSubmit)}>
                <FormItemWrap>
                  <LabelWrap>
                    <label htmlFor="nameInput">이름</label>
                  </LabelWrap>
                  <InputWrap>
                    <Input
                      type="text"
                      id="nameInput"
                      name="nameInput"
                      ref={register}
                    />
                  </InputWrap>
                </FormItemWrap>
                <FormItemWrap>
                  <LabelWrap>
                    <label htmlFor="nicknameInput">사용자 이름</label>
                  </LabelWrap>
                  <InputWrap>
                    <Input
                      type="text"
                      id="nameInput"
                      name="nicknameInput"
                      ref={register({
                        required: true,
                        maxLength: 30,
                        minLength: 3,
                        pattern: nickNameRegExp
                      })}
                    />
                    <SubText>
                      3~30자의 영문 소문자, 숫자와 밑줄(_)만 사용 가능합니다.
                    </SubText>
                  </InputWrap>
                </FormItemWrap>
                <FormItemWrap>
                  <LabelWrap></LabelWrap>
                  <Button type="submit" blur={!isDirty}>
                    제출
                  </Button>
                </FormItemWrap>
              </EditForm>
            </EditContainer>
          </EditWrap>
        )}
      </Inner>
      {errors.nicknameInput &&
        (errors.nicknameInput.type === "pattern" ||
          errors.nicknameInput.type === "minLength" ||
          errors.nicknameInput.type === "maxLength") && (
          <ErrorWrap>
            3~30자의 영문 소문자, 숫자와 밑줄(_)만 사용 가능합니다.
          </ErrorWrap>
        )}
    </>
  );
}

export default ProfileEditPage;

const Rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const EditWrap = styled.div`
  display: flex;
  margin-top: 85px;
  background-color: white;
  border: 1px solid ${palette.borderColor};
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-basis: 200px;
  border-right: 1px solid ${palette.borderColor};
  a {
    font-size: 16px;
  }
  li {
    cursor: pointer;
    padding: 20px 25px;
    border-left: 2px solid white;
    &:hover {
      background-color: ${palette.backgroundGray};
      border-left: 2px solid ${palette.borderColor};
    }
  }
  .current {
    font-weight: bold;
    border-left: 2px solid ${palette.blackColor};
    &:hover {
      background-color: white;
      border-left: 2px solid ${palette.blackColor};
    }
  }
`;

const EditContainer = styled.section`
  flex-grow: 3;
  padding: 20px;
  padding-bottom: 80px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.2;
  margin-top: 10px;
  & > span {
    width: 37px;
    height: 37px;
    margin-left: 124px;
    margin-right: 30px;
  }
  h3 {
    font-size: 20px;
  }
`;

const EditForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const FormItemWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
  label {
    font-size: 16px;
    font-weight: bold;
  }
  input {
    width: 100%;
    height: 32px;
    margin-bottom: 0;
    padding: 0 10px;
    background-color: white;
    font-size: 16px;
  }
  button {
    padding: 7px 10px;
  }
`;

const LabelWrap = styled.div`
  margin-top: 7px;
  padding: 0 30px;
  flex-basis: 190px;
  text-align: end;
`;

const InputWrap = styled.div`
  flex-basis: 350px;
  p {
    margin-top: 10px;
    word-break: keep-all;
  }
`;

const ErrorWrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #24243e;
  color: white;
`;
