import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import styled from "styled-components";
import { BiCheck } from "react-icons/bi";
import { RiSettings4Line } from "react-icons/ri";
import Button from "../../../styles/common/Button";
import {
  Inner,
  XLargeProfileIcon,
  UserNickname,
  palette
} from "../../../styles/Theme";

function ProfilePage(props) {
  const [profileUser, setProfileUser] = useState([]);
  const [followed, setFollowed] = useState(false);
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

    let variable = {
      userTo: profileUser._id,
      userFrom: localStorage.getItem("ls")
    };
    Axios.post("/api/follow/followed", variable).then((response) => {
      if (response.data.success) {
        setFollowed(response.data.followed);
      } else {
        alert("팔로우 정보를 받아오는 데 실패했습니다.");
      }
    });

    let followVariable = { userTo: profileUser._id };
    Axios.post("/api/follow/followerNumber", followVariable).then(
      (response) => {
        if (response.data.success) {
          setFollower(response.data.followerNumber);
        } else {
          alert("팔로워를 불러오는 데 실패했습니다");
        }
      }
    );
  }, [path.nickname, profileUser._id, props.history]);

  const onFollowing = () => {
    let followVariable = {
      userTo: profileUser._id,
      userFrom: localStorage.getItem("ls")
    };
    if (followed) {
      Axios.post("/api/follow/unFollow", followVariable).then((response) => {
        if (response.data.success) {
          setFollower(follower - 1);
          setFollowed(!followed);
        } else {
          alert("언팔로우하는 데 실패했습니다.");
        }
      });
    } else {
      Axios.post("/api/follow/following", followVariable).then((response) => {
        if (response.data.success) {
          setFollower(follower + 1);
          setFollowed(!followed);
        } else {
          alert("팔로잉하는 데 실패했습니다.");
        }
      });
    }
  };
  return (
    <Inner>
      <ContentsSection>
        {profileUser.profileImage && (
          <UserInfo>
            <div className="profile-image">
              <XLargeProfileIcon>
                <img
                  src={`http://localhost:5000/${profileUser.profileImage}`}
                  alt="userProfile"
                />
              </XLargeProfileIcon>
            </div>
            <UserDetail>
              <div>
                <p className="user-nickname">{profileUser.nickname}</p>
                {user.userData &&
                user.userData.nickname !== profileUser.nickname ? (
                  followed ? (
                    <Button onClick={onFollowing} gray>
                      팔로잉
                      <span>
                        <BiCheck />
                      </span>
                    </Button>
                  ) : (
                    <Button onClick={onFollowing}>팔로우</Button>
                  )
                ) : (
                  <>
                    <Button className="profile-edit" gray>
                      프로필 편집
                    </Button>
                    <span>
                      <RiSettings4Line size="30px" />
                    </span>
                  </>
                )}
              </div>
              <FollowInfo>
                <li>
                  게시물 <span>0</span>
                </li>
                <li>
                  팔로워 <span>{follower}</span>
                </li>
                <li>
                  팔로우 <span>0</span>
                </li>
              </FollowInfo>
              <UserNickname>{profileUser.name}</UserNickname>
            </UserDetail>
          </UserInfo>
        )}
      </ContentsSection>
    </Inner>
  );
}

export default withRouter(ProfilePage);

const ContentsSection = styled.section`
  position: relative;
  margin-top: 85px;
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .profile-image {
    justify-self: center;
  }
`;

const UserDetail = styled.div`
  & > div:first-child {
    display: flex;
    align-items: center;
    & > span {
      display: flex;
    }
  }
  & > p {
    font-size: 16px;
  }
  button {
    margin-left: 20px;
    padding: 6px 25px;
  }
  .profile-edit {
    padding: 5px 10px;
    margin-left: 20px;
    margin-right: 15px;
  }
  .user-nickname {
    font-size: 28px;
    font-weight: normal;
    color: ${palette.blackColor};
  }
`;

const FollowInfo = styled.ul`
  display: flex;
  margin: 20px 0;
  li {
    &:not(:last-child) {
      margin-right: 30px;
    }
    span {
      font-weight: bold;
    }
  }
`;
