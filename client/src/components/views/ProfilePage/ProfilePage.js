import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
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

function ProfilePage(props) {
  const [profileUser, setProfileUser] = useState([]);
  const [follower, setFollower] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  const user = useSelector((state) => state.user);
  const path = useParams();

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();

    const body = {
      nickname: path.nickname
    };
    Axios.post("/api/users/searchUser", body)
      .then((response) => {
        if (!unmounted) {
          if (!response.data.success) {
            props.history.push(`/not-found`);
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
    return function () {
      unmounted = true;
      source.cancel("Canceling in cleanup");
    };
  }, [path.nickname, profileUser._id, props.history]);

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

  const refreshFollower = (count) => {
    setFollower(count);
  };
  const countFollower = (value) => {
    if (value === "minus") {
      setFollower(follower - 1);
    } else if (value === "plus") {
      setFollower(follower + 1);
    }
  };

  return (
    <Inner>
      {profileUser.profileImage && (
        <ContentsSection>
          <ProfileHeader>
            <ProfileImage>
              {windowSize && windowSize.width > 735 ? (
                <ProfileIcon size="xLarge">
                  <img
                    src={`http://localhost:5000/${profileUser.profileImage}`}
                    alt="userProfile"
                  />
                </ProfileIcon>
              ) : (
                <ProfileIcon size="large">
                  <img
                    src={`http://localhost:5000/${profileUser.profileImage}`}
                    alt="userProfile"
                  />
                </ProfileIcon>
              )}
            </ProfileImage>
            <ProfileDetail>
              <div>
                <UserNickname large>{profileUser.nickname}</UserNickname>
                {user.userData &&
                user.userData.nickname !== profileUser.nickname ? (
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
              </div>
              {windowSize && windowSize.width > 735 && (
                <>
                  <FollowInfo
                    profileUser={profileUser._id}
                    refreshFollower={refreshFollower}
                  />
                  {profileUser.name && <h1>{profileUser.name}</h1>}
                </>
              )}
            </ProfileDetail>
          </ProfileHeader>
          {windowSize && windowSize.width < 735 && (
            <>
              {profileUser.name && <h1>{profileUser.name}</h1>}
              <FollowInfo
                profileUser={profileUser._id}
                refreshFollower={refreshFollower}
              />
            </>
          )}
          <UserPost profileUser={profileUser._id} />
        </ContentsSection>
      )}
    </Inner>
  );
}

export default withRouter(ProfilePage);

const ContentsSection = styled.section`
  position: relative;
  margin-top: 85px;
  @media ${viewportSize.tablet} {
    margin-top: 75px;
    h1 {
      margin: 0 16px;
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: bold;
      color: ${palette.blackColor};
    }
  }
`;

const ProfileHeader = styled.header`
  display: flex;
  margin-bottom: 30px;
  @media ${viewportSize.tablet} {
    margin: 0 16px 20px;
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
