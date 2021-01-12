import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { RiHomeFill, RiHomeLine } from "react-icons/ri";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Button from "../../../../styles/common/Button";
import styled from "styled-components";
import { palette, ProfileIcon, viewportSize } from "../../../../styles/Theme";
import ProfileMenu from "./ProfileMenu";

function RightMenu(props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const pathLocation = props.location.pathname;

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
      <div>
        <MenuList>
          <li>
            <Link to="/">
              {pathLocation === "/" && !menuVisible ? (
                <RiHomeFill size="23px" />
              ) : (
                <RiHomeLine size="23px" />
              )}
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoPaperPlaneOutline size="23px" />
            </Link>
          </li>
          <li>
            <Link to="/post/upload">
              {pathLocation === "/post/upload" && !menuVisible ? (
                <BsPlusCircleFill size="20px" />
              ) : (
                <BsPlusCircle size="20px" />
              )}
            </Link>
          </li>
          {user.userData && (
            <li>
              <ProfileIcon onClick={onClickProfile} size="small">
                {(pathLocation === `/${user.userData.nickname}` ||
                  menuVisible) && <Circle />}
                <img
                  src={`http://localhost:5000/${user.userData.profileImage}`}
                  alt="userProfile"
                />
              </ProfileIcon>
            </li>
          )}
        </MenuList>
        <ProfileMenu onClose={onClickProfile} visible={menuVisible} />
      </div>
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
const Circle = styled.span`
  position: absolute;
  top: 3px;
  right: -3px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${palette.blackColor};
  @media ${viewportSize.laptop} {
    right: 12px;
  }
`;
