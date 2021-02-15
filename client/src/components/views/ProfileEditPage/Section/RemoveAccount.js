import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../styles/common/Button";
import Input from "../../../../styles/common/Input";
import { Inner, palette, viewportSize } from "../../../../styles/Theme";
import { removeUser } from "../../../../_actions/user_action";
const { Kakao } = window;

function RemoveAccount() {
  const [confirm, setComfirm] = useState(false);
  const [disable, setDisable] = useState(false);
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (password !== "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [password]);

  useEffect(() => {
    if (
      user.userData &&
      (user.userData.sns_type === "naver" || user.userData.sns_type === "kakao")
    ) {
      setDisable(true);
    }
  }, [user.userData]);

  const onVisible = (event) => {
    event.preventDefault();
    setComfirm(!confirm);
  };

  const onRemove = (body) => {
    dispatch(removeUser(body)).then((response) => {
      if (response.payload.success) {
        localStorage.removeItem("com.naver.nid.access_token");
        localStorage.removeItem("naverToken");
        alert("탈퇴가 완료되었습니다.");
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      } else {
        alert(response.payload.message);
      }
    });
  };

  const onRecomfirm = () => {
    let body;
    if (user.userData.sns_type === "naver") {
      const token = localStorage.getItem("naverToken");
      body = {
        userId: user.userData._id,
        password: password,
        token
      };
      onRemove(body);
    } else {
      body = { userId: user.userData._id, password: password };
      if (user.userData.sns_type === "kakao") {
        Kakao.API.request({
          url: "/v1/user/unlink",
          success: function (response) {
            onRemove(body);
          },
          fail: function (error) {
            console.log(error);
            alert("계정 해지를 실패했습니다.");
          }
        });
      } else {
        onRemove(body);
      }
    }
  };

  const onChangeHandler = (event) => {
    setPassword(event.target.value);
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
              {!user.userData.sns_type && (
                <Link to="/accounts/password/change">
                  <li>비밀번호 변경</li>
                </Link>
              )}
            </MenuList>
            <EditContainer>
              <h2>계정 탈퇴하기</h2>
              <p>안녕히계세요 여러분..</p>
              <EditForm onSubmit={onVisible}>
                {user.userData.sns_type === "naver" ||
                user.userData.sns_type === "kakao" ? (
                  <FormItemWrap>
                    <LabelWrap>
                      카카오 또는 네이버 회원은 계정 연동이 해지됩니다
                    </LabelWrap>
                  </FormItemWrap>
                ) : (
                  <FormItemWrap>
                    <LabelWrap>계속하려면 비밀번호를 다시 입력하세요</LabelWrap>
                    <InputWrap>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        onChange={onChangeHandler}
                        value={password}
                      />
                    </InputWrap>
                  </FormItemWrap>
                )}

                <p>
                  아래 버튼을 누르면 게시글, 댓글, 좋아요 등 계정 관련 정보가
                  삭제됩니다.
                </p>
                <Button type="submit" onClick={onVisible} blur={!disable}>
                  탈퇴하기
                </Button>
                {confirm && (
                  <>
                    <ConfirmBox>
                      <p>계정을 탈퇴하려고 합니다. 계속하시겠어요?</p>
                      <Button onClick={onRecomfirm}>예</Button>
                      <Button onClick={onVisible}>아니요</Button>
                    </ConfirmBox>
                    <Triangle />
                  </>
                )}
              </EditForm>
            </EditContainer>
          </EditWrap>
        )}
      </Inner>
    </>
  );
}

export default RemoveAccount;

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
  padding: 50px 50px 80px 80px;
  h2 {
    font-size: 25px;
    font-weight: normal;
    margin-bottom: 40px;
  }
  @media ${viewportSize.tablet} {
    padding: 20px;
  }
`;

const EditForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > button {
    margin-top: 30px;
    padding: 7px 10px;
  }
`;

const FormItemWrap = styled.div`
  width: 100%;
  display: flex;
  margin: 30px 0;
  padding: 40px 0;
  padding-right: 50px;
  border-top: 1px solid ${palette.borderColor};
  border-bottom: 1px solid ${palette.borderColor};
  label {
    font-size: 16px;
    font-weight: bold;
  }
  input {
    height: 32px;
    margin-bottom: 0;
    padding: 0 10px;
    background-color: white;
    font-size: 16px;
  }

  @media ${viewportSize.tablet} {
    display: block;
  }
`;

const LabelWrap = styled.div`
  margin-top: 1px;
  padding-right: 30px;
  font-size: 15px;
  font-weight: bold;
  text-align: end;
  word-break: keep-all;

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

const ConfirmBox = styled.div`
  position: absolute;
  bottom: 50px;
  width: 240px;
  padding: 30px;
  padding-bottom: 20px;
  border: 1px solid ${palette.borderColor};
  background-color: white;
  word-break: keep-all;
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  button {
    margin-top: 20px;
    &:last-child {
      margin-left: 15px;
    }
  }
`;

const Triangle = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  left: 30px;
  bottom: 44px;
  background-color: white;
  border-bottom: 1px solid ${palette.borderColor};
  border-right: 1px solid ${palette.borderColor};
  transform: rotate(45deg);
  @media ${viewportSize.laptop} {
    right: 35px;
  }
`;
