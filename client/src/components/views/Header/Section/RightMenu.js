import React from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPlusCircle } from "react-icons/bs";
import Button from "../../../../styles/common/Button";
import styled from "styled-components";
import { palette } from "../../../../styles/Theme";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const onClickLogout = () => {
    Axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃하는 데 실패했습니다.");
      }
    });
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <BtnWrap>
        <Link to="/login">
          <Button>로그인</Button>
        </Link>
        <Link to="/accounts">
          <AccountBtn>가입하기</AccountBtn>
        </Link>
      </BtnWrap>
    );
  } else {
    return (
      <BtnWrap>
        <Link to="/post/upload">
          <UploadPostBtn value="글쓰기">
            <BsPlusCircle size="22px" />
          </UploadPostBtn>
        </Link>
        <button onClick={onClickLogout}>로그아웃</button>
      </BtnWrap>
    );
  }
}

export default withRouter(RightMenu);

const AccountBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: ${palette.ActivatedColor};
  font-size: 15px;
  font-weight: bold;
`;

const UploadPostBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a:first-child {
    margin-right: 10px;
  }
`;
