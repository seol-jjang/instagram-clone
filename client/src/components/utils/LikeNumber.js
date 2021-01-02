import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../styles/Theme";

function LikeNumber(props) {
  const [likeNumber, setLikeNumber] = useState(0);
  useEffect(() => {
    const variable = { postId: props.postId };
    setLikeNumber(props.newLikeNumber);
    Axios.post("/api/like/getPostLikes", variable).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likesNumber);
      } else {
        alert("좋아요 정보를 가져오는 데 실패했습니다.");
      }
    });
  }, [props]);
  return (
    <>
      {likeNumber > 0 && (
        <Section detailPage={props.detailPage}>
          <LikeText>좋아요 {likeNumber}개</LikeText>
        </Section>
      )}
    </>
  );
}

export default LikeNumber;

const Section = styled.section`
  padding: 0 12px;
  margin-bottom: 10px;
  ${(props) =>
    props.detailPage &&
    css`
      padding: 0 16px;
      margin-bottom: 5px;
    `}
`;

const LikeText = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${palette.blackColor};
`;
