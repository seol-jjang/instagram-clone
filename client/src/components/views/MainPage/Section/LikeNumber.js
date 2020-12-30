import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../styles/Theme";

function LikeNumber(props) {
  const [likeNumber, setLikeNumber] = useState(0);
  useEffect(() => {
    const variable = { postId: props.postId };
    setLikeNumber(props.likeNumber);
    Axios.post("/api/like/getPostLikes", variable).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likesNumber);
      } else {
        alert("좋아요 정보를 가져오는 데 실패했습니다.");
      }
    });
  }, [props]);
  return <>{likeNumber > 0 && <LikeText>좋아요 {likeNumber}개</LikeText>}</>;
}

export default LikeNumber;

const LikeText = styled.p`
  padding: 5px 12px;
  font-size: 14px;
  font-weight: bold;
  color: ${palette.blackColor};
`;
