import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../styles/common/Button";
import {
  Inner,
  palette,
  ProfileIcon,
  UserNickname,
  viewportSize
} from "../../../styles/Theme";
import UserPost from "./Section/UserPost";
import FollowInfo from "./Section/FollowInfo";
import FollowingBtn from "./Section/FollowingBtn";
import ScrapSection from "./Section/ScrapSection";

function ProfilePage(props) {
  const user = useSelector((state) => state.user);
  const path = useParams();
  const history = useHistory();

  const [profileUser, setProfileUser] = useState([]);
  const [follower, setFollower] = useState(0);
  const [postNumber, setPostNumber] = useState(0);
  const [tabNumber, setTabNumber] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();

    const body = {
      nickname: path.nickname
    };
    if (
      path.nickname !== "login" &&
      path.nickname !== "accounts" &&
      path.nickname !== "explore"
    ) {
      Axios.post("/api/users/searchUser", body)
        .then((response) => {
          if (!unmounted) {
            if (!response.data.success) {
              history.push("/not-found");
            } else {
              setProfileUser(response.data.userData);
            }
          }
        })
        .catch(function (e) {
          if (!unmounted) {
            if (Axios.isCancel(e)) {
              console.log("요청 취소: ", e.message);
            } else {
              console.log("오류 발생 ", e.message);
            }
          }
        });
    }
    return function () {
      unmounted = true;
      source.cancel("Canceling in cleanup");
    };
  }, [history, path.nickname, profileUser._id]);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const countFollower = (value) => {
    if (value === "minus") {
      setFollower(follower - 1);
    } else if (value === "plus") {
      setFollower(follower + 1);
    }
  };
  const refreshFollower = (count) => {
    setFollower(count);
  };
  const refreshPostNumber = (count) => {
    setPostNumber(count);
  };

  return (
    <Inner>
      {profileUser.profileImage && (
        <ContentsSection>
          <ProfileHeader>
            <ProfileImage>
              {windowSize && windowSize.width > 735 ? (
                <ProfileIcon size="xLarge">
                  <img src={`${profileUser.profileImage}`} alt="userProfile" />
                </ProfileIcon>
              ) : (
                <ProfileIcon size="large">
                  <img src={`${profileUser.profileImage}`} alt="userProfile" />
                </ProfileIcon>
              )}
            </ProfileImage>
            <ProfileDetail>
              <div>
                <UserNickname large>{profileUser.nickname}</UserNickname>
                {user.userData && user.userData.isAuth && (
                  <>
                    {user.userData.nickname !== profileUser.nickname ? (
                      <FollowingBtn
                        userTo={profileUser._id}
                        countFollower={countFollower}
                      />
                    ) : (
                      <Link to="/accounts/edit">
                        <Button className="profile-edit" gray>
                          프로필 편집
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
              {windowSize && windowSize.width > 735 && (
                <>
                  <FollowInfo
                    profileUser={profileUser._id}
                    refreshFollower={refreshFollower}
                    postNumber={postNumber}
                  />
                  <h1>{profileUser.name}</h1>
                </>
              )}
            </ProfileDetail>
          </ProfileHeader>
          {windowSize && windowSize.width < 735 && (
            <>
              <h1>{profileUser.name}</h1>
              <FollowInfo
                profileUser={profileUser._id}
                refreshFollower={refreshFollower}
                postNumber={postNumber}
              />
            </>
          )}
          <ProfileNav>
            <li
              className={`${tabNumber === 0 ? `active` : ""}`}
              onClick={() => setTabNumber(0)}
            >
              게시물
            </li>
            {user.userData && user.userData.isAuth && (
              <li
                className={`${tabNumber === 1 ? `active` : ""}`}
                onClick={() => setTabNumber(1)}
              >
                저장됨
              </li>
            )}
          </ProfileNav>
          {tabNumber === 0 ? (
            <UserPost
              profileUser={profileUser._id}
              refreshPostNumber={refreshPostNumber}
            />
          ) : (
            <ScrapSection profileUser={profileUser._id} />
          )}
        </ContentsSection>
      )}
    </Inner>
  );
}

export default ProfilePage;

const ContentsSection = styled.section`
  position: relative;
  margin-top: 85px;
  @media ${viewportSize.tablet} {
    margin-top: 0;
    padding-top: 55px;
    h1 {
      padding: 0 16px 20px;
      background-color: white;
      font-size: 14px;
      font-weight: bold;
      color: ${palette.blackColor};
    }
  }
`;

const ProfileHeader = styled.header`
  display: flex;
  padding-bottom: 30px;
  border-bottom: 1px solid ${palette.borderColor};
  @media ${viewportSize.tablet} {
    padding: 20px 16px 20px;
    border-bottom: 0;
    background-color: white;
  }
`;

const ProfileImage = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  @media ${viewportSize.tablet} {
    flex-grow: 0;
    & > span {
      width: 77px;
      height: 77px;
    }
  }
`;

const ProfileDetail = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  flex-basis: 30px;
  & > div {
    display: flex;
    align-items: center;
    button {
      margin: 0;
      margin-left: 20px;
      padding: 7px 10px;
    }
  }
  h1 {
    font-size: 17px;
    font-weight: bold;
    color: ${palette.blackColor};
  }

  @media ${viewportSize.tablet} {
    justify-content: center;
    & > div {
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      button {
        margin-top: 10px;
        margin-left: 10px;
        padding: 5px 10px;
      }
    }
  }
`;

const ProfileNav = styled.ul`
  display: flex;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  li {
    cursor: pointer;
    margin-top: -1px;
    padding: 20px 0;
    border-top: 1px solid ${palette.borderColor};
    color: ${palette.grayText};
    &:first-child {
      margin-right: 50px;
    }
  }
  .active {
    border-top: 1px solid ${palette.blackColor};
    color: ${palette.blackColor};
  }

  @media ${viewportSize.tablet} {
    display: flex;
    background-color: white;
    li {
      flex-grow: 1;
      display: flex;
      justify-content: center;
    }
    li:first-child {
      margin-right: 0px;
    }
  }
`;
