import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Inner,
  SubText,
  UserNickname,
  ProfileIcon
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
                  <ProfileIcon size="large">
                    <img
                      src={`http://localhost:5000/${user.userData.profileImage}`}
                      alt="userProfile"
                    />
                  </ProfileIcon>
                  <div>
                    <UserNickname>{user.userData.nickname}</UserNickname>
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
`;

const RightSection = styled.div`
  height: 100vh;
  padding: 20px 0 20px 10px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
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
