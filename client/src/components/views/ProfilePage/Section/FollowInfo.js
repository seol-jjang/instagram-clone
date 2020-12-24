import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { viewportSize } from "../../../../styles/Theme";

function FollowInfo(props) {
  const { profileUser, refreshFollower } = props;
  const [following, setFollowing] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [follower, setFollower] = useState(0);
  useEffect(() => {
    const userFromVariable = { userFrom: profileUser };
    const userToVariable = { userTo: profileUser };

    Axios.post("/api/post/getUserPostCount", userFromVariable).then(
      (response) => {
        if (response.data.success) {
          setPostCount(response.data.postLength);
        } else {
          alert("게시글을 불러오는 데 실패했습니다.");
        }
      }
    );

    Axios.post("/api/follow/followerNumber", userToVariable).then(
      (response) => {
        if (response.data.success) {
          setFollower(response.data.followerNumber);
          refreshFollower(response.data.followerNumber);
        } else {
          alert("팔로워 정보를 불러오는 데 실패했습니다");
        }
      }
    );
    Axios.post("/api/follow/followingNumber", userFromVariable).then(
      (response) => {
        if (response.data.success) {
          setFollowing(response.data.followingNumber);
        } else {
          alert("팔로잉 정보를 불러오는 데 실패했습니다");
        }
      }
    );
  });
  return (
    <DataList>
      <li>
        게시글 <span>{postCount}</span>
      </li>
      <li>
        팔로워 <span>{follower}</span>
      </li>
      <li>
        팔로우 <span>{following}</span>
      </li>
    </DataList>
  );
}

export default FollowInfo;

const DataList = styled.ul`
  display: flex;
  margin-top: 30px;
  margin-bottom: 20px;
  li {
    &:not(:last-child) {
      margin-right: 30px;
    }
    span {
      font-weight: bold;
    }
  }

  @media ${viewportSize.tablet} {
    width: 100%;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
