import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import Button from "../../../styles/common/Button";

function Following(props) {
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    let variable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("ls")
    };
    Axios.post("/api/follow/followed", variable).then((response) => {
      if (response.data.success) {
        setFollowed(response.data.followed);
      } else {
        alert("팔로우 정보를 받아오는 데 실패했습니다.");
      }
    });
  }, [props.userTo]);

  const onFollowing = () => {
    let followVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom
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

export default Following;
