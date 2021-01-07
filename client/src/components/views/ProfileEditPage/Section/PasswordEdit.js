import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../../../../styles/common/Input";
import {
  Inner,
  palette,
  ProfileIcon,
  SubText,
  viewportSize
} from "../../../../styles/Theme";
import Button from "../../../../styles/common/Button";
import { editPassword } from "../../../../_actions/user_action";
import { Link } from "react-router-dom";

function PasswordEdit() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const {
    register,
    errors,
    handleSubmit,
    formState: { dirtyFields }
  } = useForm();

  useEffect(() => {
    if (
      dirtyFields.prevPassword &&
      dirtyFields.newPassword &&
      dirtyFields.newPasswordConfirm
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [
    dirtyFields.newPassword,
    dirtyFields.newPasswordConfirm,
    dirtyFields.prevPassword
  ]);

  const onSubmit = (data) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      alert("두 비밀번호가 일치하는 지 확인하세요.");
      return;
    }
    const body = {
      prevPassword: data.prevPassword,
      newPassword: data.newPassword
    };
    dispatch(editPassword(body)).then((response) => {
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
                <li>프로필 편집</li>
              </Link>
              <Link to="/accounts/password/change">
                <li className="current">비밀번호 변경</li>
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
                </div>
              </ImageContainer>
              <EditForm onSubmit={handleSubmit(onSubmit)}>
                <FormItemWrap>
                  <LabelWrap>
                    <label htmlFor="prevPassword">이전 비밀번호</label>
                  </LabelWrap>
                  <InputWrap>
                    <Input
                      type="password"
                      id="prevPassword"
                      name="prevPassword"
                      ref={register({ required: true, minLength: 6 })}
                    />
                  </InputWrap>
                </FormItemWrap>
                <FormItemWrap>
                  <LabelWrap>
                    <label htmlFor="newPassword">새 비밀번호</label>
                  </LabelWrap>
                  <InputWrap>
                    <Input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      ref={register({ required: true, minLength: 6 })}
                    />
                  </InputWrap>
                </FormItemWrap>
                <FormItemWrap>
                  <LabelWrap>
                    <label htmlFor="newPasswordConfirm">새 비밀번호 확인</label>
                  </LabelWrap>
                  <InputWrap>
                    <Input
                      type="password"
                      id="newPasswordConfirm"
                      name="newPasswordConfirm"
                      ref={register({
                        required: true,
                        minLength: 6
                      })}
                    />
                  </InputWrap>
                </FormItemWrap>
                <FormItemWrap>
                  <LabelWrap></LabelWrap>
                  <Button type="submit" blur={!btnDisabled}>
                    비밀번호 변경
                  </Button>
                </FormItemWrap>
              </EditForm>
            </EditContainer>
          </EditWrap>
        )}
      </Inner>
    </>
  );
}

export default PasswordEdit;

const EditWrap = styled.div`
  display: flex;
  margin-top: 85px;
  background-color: white;
  border: 1px solid ${palette.borderColor};

  @media ${viewportSize.tablet} {
    border: 0;
    border-top: 1px solid ${palette.borderColor};
    border-bottom: 1px solid ${palette.borderColor};
  }
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

  @media ${viewportSize.tablet} {
    display: none;
  }
`;

const EditContainer = styled.section`
  flex-grow: 3;
  padding: 20px;
  padding-bottom: 80px;

  @media ${viewportSize.tablet} {
    padding: 20px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.2;
  margin-top: 10px;
  & > span {
    margin-right: 30px;
    margin-left: 124px;
    width: 37px;
    height: 37px;
  }
  h3 {
    font-size: 20px;
  }

  @media ${viewportSize.tablet} {
    margin-top: 0;
    & > span {
      margin-left: 0;
      margin-right: 20px;
    }
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
    height: 38px;
    margin-bottom: 0;
    padding: 0 10px;
    background-color: #fafafa;
    font-size: 16px;
    border-radius: 5px;
  }
  button {
    padding: 7px 10px;
  }

  @media ${viewportSize.tablet} {
    display: block;
  }
`;

const LabelWrap = styled.div`
  margin-top: 7px;
  padding: 0 30px;
  width: 190px;
  text-align: end;

  @media ${viewportSize.tablet} {
    width: auto;
    margin-top: 0;
    margin-bottom: 7px;
    padding: 0;
    text-align: start;
  }
`;

const InputWrap = styled.div`
  max-width: 350px;
  flex-basis: 350px;
  p {
    margin-top: 10px;
    word-break: keep-all;
  }
`;
