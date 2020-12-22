import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../styles/common/Button";
import { Inner, ProfileIcon, UserNickname } from "../../../styles/Theme";
import UserPost from "./Section/UserPost";
import FollowInfo from "./Section/FollowInfo";
import FollowingBtn from "./Section/FollowingBtn";

function ProfilePage(props) {
  const [profileUser, setProfileUser] = useState([]);
  const [follower, setFollower] = useState(0);
  const user = useSelector((state) => state.user);
  const path = useParams();

  useEffect(() => {
    const body = {
      nickname: path.nickname
    };
    Axios.post("/api/users/searchUser", body).then((response) => {
      if (!response.data.success) {
        props.history.push(`/not-found`);
      } else {
        setProfileUser(response.data.userData);
      }
    });
  }, [path.nickname, profileUser._id, props.history]);

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
          <ProfileContainer>
            <ProfileImage>
              <ProfileIcon size="xLarge">
                <img
                  src={`http://localhost:5000/${profileUser.profileImage}`}
                  alt="userProfile"
                />
              </ProfileIcon>
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
                  <>
                    <Button className="profile-edit" gray>
                      프로필 편집
                    </Button>
                  </>
                )}
              </div>
              <FollowInfo
                profileUser={profileUser._id}
                refreshFollower={refreshFollower}
              />
            </ProfileDetail>
          </ProfileContainer>
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
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled.div`
  flex-grow: 1;
`;

const ProfileDetail = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    align-items: center;
    button {
      margin: 0;
      margin-left: 20px;
      padding: 7px 10px;
    }
  }
`;
