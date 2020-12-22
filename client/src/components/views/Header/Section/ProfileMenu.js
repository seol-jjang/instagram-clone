import React from "react";
import styled, { keyframes } from "styled-components";
import { RiSettings4Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../../../styles/Theme";

function ProfileMenu(props) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const { onClose } = props;

  const onClickLogout = () => {
    Axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        history.push("/login");
      } else {
        alert("로그아웃하는 데 실패했습니다.");
      }
    });
  };

  const close = () => {
    onClose();
  };
  return (
    <>
      <Circle />
      <MenuWrapper onClick={close}>
        <Triangle />
        <MenuInner>
          <ul>
            <li>
              <Link to={`/user/${user.userData.nickname}`}>
                <CgProfile size="18px" />
                <span>프로필</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <RiSettings4Line size="20px" />
                <span>설정</span>
              </Link>
            </li>
            <li onClick={onClickLogout}>로그아웃</li>
          </ul>
        </MenuInner>
      </MenuWrapper>
      <MenuBackground onClick={close} />
    </>
  );
}

export default ProfileMenu;

const slideFade = keyframes`
    100% {
        transform: translateY(0);
        opacity: 1;
    }
    0% {
        transform: translateY(-10px);
        opacity: 0;
    }
`;

const MenuWrapper = styled.div`
  z-index: 99;
  position: absolute;
  top: 45px;
  right: -15px;
  outline: 0;
  border-radius: 7px;
  background-color: #fff;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.09);
  animation: ${slideFade} 0.5s forwards;
`;

const MenuInner = styled.div`
  position: relative;
  width: 230px;
  max-width: 230px;
  border-radius: 7px;
  background-color: white;
  ul {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ul li {
    cursor: pointer;
    padding: 10px 15px;
    a {
      display: flex;
      align-items: center;
      font-size: 15px;
      span {
        margin-left: 10px;
      }
    }
    &:last-child {
      border-top: 1px solid ${palette.borderColor};
      padding: 13px 15px;
    }
    &:hover {
      background-color: #fbfbfb;
    }
  }
`;

const MenuBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Triangle = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  top: -7px;
  right: 20px;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  transform: rotate(45deg);
`;

const Circle = styled.div`
  position: absolute;
  right: -3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid black;
`;
