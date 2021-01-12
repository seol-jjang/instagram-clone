import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Inner,
  SubText,
  UserNickname,
  ProfileIcon,
  viewportSize
} from "../../../styles/Theme";
import PostFactory from "./Section/PostFactory";

const MainPage = () => {
  const user = useSelector((state) => state.user);

  if (user.userData && user.userData.isAuth) {
    return (
      <Inner>
        <ContentsSection>
          <LeftSection>
            <PostFactory />
          </LeftSection>
          <RightSection>
            {user.userData && (
              <UserInfo>
                <>
                  <Link to={`/${user.userData.nickname}`}>
                    <ProfileIcon size="large">
                      <img
                        src={`http://localhost:5000/${user.userData.profileImage}`}
                        alt="userProfile"
                      />
                    </ProfileIcon>
                  </Link>
                  <div>
                    <Link to={`/${user.userData.nickname}`}>
                      <UserNickname>{user.userData.nickname}</UserNickname>
                    </Link>
                    {user.userData.name !== "" && (
                      <SubText>{user.userData.name}</SubText>
                    )}
                  </div>
                </>
              </UserInfo>
            )}
          </RightSection>
        </ContentsSection>
      </Inner>
    );
  } else {
    return <></>;
  }
};

export default MainPage;

const ContentsSection = styled.section`
  position: relative;
  margin-top: 85px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  overflow: hidden;

  @media ${viewportSize.laptop} {
    margin-top: 65px;
    display: flex;
    justify-content: center;
  }
  @media ${viewportSize.tablet} {
    margin-top: 55px;
  }
`;

const RightSection = styled.div`
  height: 100vh;
  padding: 20px 0 20px 10px;

  @media ${viewportSize.laptop} {
    display: none;
  }
`;

const LeftSection = styled.div`
  max-width: 614px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media ${viewportSize.tablet} {
    width: 100%;
    max-width: 100%;
  }
`;

const UserInfo = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  line-height: 1.2;
  margin-bottom: 25px;
  span {
    margin-right: 15px;
  }
`;
