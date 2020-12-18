import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import {
  AddText,
  Inner,
  UserNickname,
  LargeProfileIcon
} from "../../../styles/Theme";
import MainSection from "./Section/MainSection";

const LandingPage = (props) => {
  const user = useSelector((state) => state.user);

  if (user.userData && user.userData.isAuth) {
    return (
      <>
        <Inner>
          <ContentsSection>
            <MainSection />
            <RightSection>
              <UserInfo>
                {user.userData && (
                  <>
                    <LargeProfileIcon>
                      <img
                        src={`http://localhost:5000/${user.userData.profileImage}`}
                        alt="userProfile"
                      />
                    </LargeProfileIcon>
                    <div>
                      <UserNickname>{user.userData.nickname}</UserNickname>
                      {user.userData.name !== "" ? (
                        <AddText>{user.userData.name}</AddText>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                )}
              </UserInfo>
              {/* <SuggestUser>
                <div>
                  <h4>회원님을 위한 추천</h4>
                  <a href="/">모두 보기</a>
                </div>
                <ul>
                  <li></li>
                </ul>
              </SuggestUser> */}
            </RightSection>
          </ContentsSection>
        </Inner>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default withRouter(LandingPage);

const ContentsSection = styled.section`
  position: relative;
  margin-top: 85px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

const RightSection = styled.div`
  height: 100vh;
  padding: 20px 0 20px 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.2;
  margin-bottom: 25px;
  span {
    margin-right: 15px;
  }
`;

const SuggestUser = styled.div`
  font-size: 14px;
  font-weight: bold;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: bottom;
  }
  h4 {
    color: #8d8d8d;
  }
  a {
    font-size: 13px;
  }
`;
