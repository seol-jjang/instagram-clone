import React, { useState } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { RiHomeFill, RiHomeLine, RiSettings4Line } from "react-icons/ri";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Button from "../../../../styles/common/Button";
import styled from "styled-components";
import { palette, SmallProfileIcon } from "../../../../styles/Theme";
import ProfileMenu from "./ProfileMenu";

function RightMenu(props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const pathLocation = props.location.pathname;
  const onClickLogout = () => {
    Axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃하는 데 실패했습니다.");
      }
    });
  };

  const onClickProfile = () => {
    setMenuVisible(!menuVisible);
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <MenuList>
        <li>
          <Link to="/login">
            <Button>로그인</Button>
          </Link>
        </li>
        <li>
          <Link to="/accounts">
            <AccountBtn>가입하기</AccountBtn>
          </Link>
        </li>
      </MenuList>
    );
  } else {
    return (
      <>
        <MenuList>
          <li>
            {pathLocation === "/" && !menuVisible ? (
              <Link to="/">
                <RiHomeFill size="23px" />
              </Link>
            ) : (
              <Link to="/">
                <RiHomeLine size="23px" />
              </Link>
            )}
          </li>
          <li>
            <Link to="/">
              <IoPaperPlaneOutline size="23px" />
            </Link>
          </li>
          <li>
            {pathLocation === "/post/upload" ? (
              <Link to="/post/upload">
                <BsPlusCircleFill size="20px" />
              </Link>
            ) : (
              <Link to="/post/upload">
                <BsPlusCircle size="20px" />
              </Link>
            )}
          </li>
          {user.userData && (
            <li>
              <SmallProfileIcon onClick={onClickProfile}>
                <img
                  src={`http://localhost:5000/${user.userData.profileImage}`}
                  alt="userProfile"
                />
              </SmallProfileIcon>
            </li>
          )}
        </MenuList>
        {menuVisible && (
          <ProfileMenu onClose={onClickProfile}>
            <ProfileMenuList>
              <li>
                <CgProfile size="18px" />
                <span>프로필</span>
              </li>
              <li>
                <RiSettings4Line size="20px" />
                <span>설정</span>
              </li>
              <li onClick={onClickLogout}>로그아웃</li>
            </ProfileMenuList>
          </ProfileMenu>
        )}
      </>
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

const MenuList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    display: flex;
    &:not(:first-child) {
      margin-left: 20px;
    }
    button {
      margin: 0;
    }
  }
`;

const ProfileMenuList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    cursor: pointer;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    font-size: 15px;
    span {
      margin-left: 10px;
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
