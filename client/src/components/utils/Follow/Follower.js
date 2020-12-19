import Axios from "axios";
import React, { useEffect, useState } from "react";

const Follower = (props) => {
  const [follower, setFollower] = useState(0);
  useEffect(() => {
    let variable = { userTo: props.userTo };
    Axios.post("/api/follow/followerNumber", variable).then((response) => {
      if (response.data.success) {
        setFollower(response.data.followerNumber);
      } else {
        alert("팔로워를 불러오는 데 실패했습니다");
      }
    });
  }, [props.userTo]);
  return <>{follower}</>;
};

export default Follower;
