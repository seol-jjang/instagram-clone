import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import Button from "../../../../styles/common/Button";

function FollowingBtn(props) {
  const { countFollower, userTo } = props;
  const user = useSelector((state) => state.user);
  const [followed, setFollowed] = useState(false);

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
          countFollower("minus");
        } else {
          alert("언팔로우하는 데 실패했습니다.");
        }
      });
    } else {
      Axios.post("/api/follow/following", followVariable).then((response) => {
        if (response.data.success) {
          setFollowed(!followed);
          countFollower("plus");
        } else {
          alert("팔로잉하는 데 실패했습니다.");
        }
      });
    }
  };
  return (
    <>
      {followed ? (
        <Button onClick={onFollowing} gray>
          팔로잉
          <span>
            <BiCheck />
          </span>
        </Button>
      ) : (
        <Button onClick={onFollowing}>팔로우</Button>
      )}
    </>
  );
}

export default FollowingBtn;
