import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette, viewportSize } from "../../../../styles/Theme";

function FollowInfo(props) {
  const { profileUser, refreshFollower, postNumber } = props;
  const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();

    const userFromVariable = { userFrom: profileUser };
    const userToVariable = { userTo: profileUser };
    Axios.post("/api/follow/followerNumber", userToVariable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setFollower(response.data.followerNumber);
            refreshFollower(response.data.followerNumber);
          } else {
            alert("팔로워 정보를 불러오는 데 실패했습니다");
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
    Axios.post("/api/follow/followingNumber", userFromVariable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setFollowing(response.data.followingNumber);
          } else {
            alert("팔로잉 정보를 불러오는 데 실패했습니다");
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
  }, [profileUser, refreshFollower]);

  return (
    <DataList>
      <li>
        게시물 <span>{postNumber}</span>
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
    align-items: center;
    justify-content: space-around;
    margin-top: 0;
    margin-bottom: 0;
    padding: 12px 0;
    border-top: 1px solid ${palette.borderColor};
    border-bottom: 1px solid ${palette.borderColor};
    color: ${palette.grayText};
    font-size: 14px;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.2;
      &:not(:last-child) {
        margin-right: 0;
      }
      span {
        color: ${palette.blackColor};
      }
    }
  }
`;
