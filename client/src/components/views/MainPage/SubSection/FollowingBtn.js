import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import styled, { css } from "styled-components";
import { palette } from "../../../../styles/Theme";

function FollowingBtn(props) {
  const [followed, setFollowed] = useState(false);
  const { userTo } = props;

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();

    let variable = {
      userTo: userTo,
      userFrom: localStorage.getItem("ls")
    };
    Axios.post("/api/follow/followed", variable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setFollowed(response.data.followed);
          } else {
            alert("팔로우 정보를 받아오는 데 실패했습니다.");
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
  }, [userTo]);

  const onFollowing = () => {
    let followVariable = {
      userTo: userTo,
      userFrom: localStorage.getItem("ls")
    };
    if (followed) {
      Axios.post("/api/follow/unFollow", followVariable).then((response) => {
        if (response.data.success) {
          setFollowed(!followed);
        } else {
          alert("언팔로우하는 데 실패했습니다.");
        }
      });
    } else {
      Axios.post("/api/follow/following", followVariable).then((response) => {
        if (response.data.success) {
          setFollowed(!followed);
        } else {
          alert("팔로잉하는 데 실패했습니다.");
        }
      });
    }
  };
  return (
    <>
      {followed ? (
        <TextBtn onClick={onFollowing} followed>
          팔로잉
        </TextBtn>
      ) : (
        <TextBtn onClick={onFollowing}>팔로우</TextBtn>
      )}
    </>
  );
}

export default FollowingBtn;

const TextBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  color: ${palette.ActivatedColor};
  font-size: 13px;
  font-weight: bold;

  ${(props) =>
    props.followed &&
    css`
      color: ${palette.blackColor};
    `}
`;
