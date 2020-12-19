import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Inner, XLargeProfileIcon, UserNickname } from "../../../styles/Theme";
import Follower from "../../utils/Follow/Follower";
import Following from "../../utils/Follow/Following";

function ProfilePage(props) {
  const [profileUser, setProfileUser] = useState([]);
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
  }, [path, path.nickname, props.history]);
  return (
    <Inner>
      <ContentsSection>
        {profileUser !== null && (
          <UserInfo>
            <div className="profile-image">
              {profileUser.profileImage && (
                <XLargeProfileIcon>
                  <img
                    src={`http://localhost:5000/${profileUser.profileImage}`}
                    alt="userProfile"
                  />
                </XLargeProfileIcon>
              )}
            </div>
            <div>
              <UserNickname>{profileUser.nickname}</UserNickname>
              {user.userData &&
                user.userData.nickname !== profileUser.nickname && (
                  <Following
                    userTo={profileUser._id}
                    userFrom={localStorage.getItem("ls")}
                  />
                )}
            </div>
            <div>
              <p>
                팔로워{" "}
                <span>
                  <Follower userTo={profileUser._id} />
                </span>
              </p>
            </div>
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
  align-items: center;
  .profile-image {
    justify-self: center;
    margin-right: 50px;
  }
`;
