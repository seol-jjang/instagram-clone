import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  palette,
  ProfileIcon,
  SubText,
  UserNickname
} from "../../../../styles/Theme";

function SearchDialog(props) {
  const { onClose, visible, searchData } = props;
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  const close = () => {
    onClose();
  };
  if (!animate && !visible) return null;
  return (
    <>
      {searchData.length !== 0 ? (
        <MenuWrapper onClick={close}>
          <Triangle />
          <MenuInner>
            <ul>
              {searchData.map((user, index) => (
                <li key={index}>
                  <Link to={`/${user.nickname}`}>
                    <ProfileIcon size="medium" className="profile-icon">
                      <img
                        src={`http://localhost:5000/${user.profileImage}`}
                        alt="userProfile"
                      />
                    </ProfileIcon>
                    <div>
                      <UserNickname>{user.nickname}</UserNickname>
                      <SubText>{user.name}</SubText>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </MenuInner>
        </MenuWrapper>
      ) : (
        <MenuWrapper onClick={close}>
          <Triangle />
          <MenuInner>
            <ul>
              <li>
                <p>일치하는 사용자가 없습니다.</p>
              </li>
            </ul>
          </MenuInner>
        </MenuWrapper>
      )}
    </>
  );
}

export default SearchDialog;

const MenuWrapper = styled.div`
  z-index: 99;
  position: absolute;
  top: 30px;
  right: calc(50% - 125px);
  outline: 0;
  border: 1px solid ${palette.borderColor};
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.09);
`;

const MenuInner = styled.div`
  position: relative;
  width: 250px;
  max-width: 300px;
  border-radius: 3px;
  background-color: white;
  ul {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ul li {
    cursor: pointer;
    padding: 12px 15px;
    line-height: 1.3;
    &:not(:last-child) {
      border-bottom: 1px solid ${palette.borderColor};
    }
    a {
      display: flex;
      align-items: center;
      .profile-icon {
        margin-right: 10px;
      }
    }
    &:hover {
      background-color: #fbfbfb;
    }
  }
`;

const Triangle = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  top: -7px;
  right: 50%;
  background-color: white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  transform: rotate(45deg);
`;
