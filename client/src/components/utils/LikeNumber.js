import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../styles/Theme";

function LikeNumber(props) {
  const { detailPage, postId, newLikeNumber } = props;
  const [likeNumber, setLikeNumber] = useState(0);
  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();

    const variable = { postId: postId };
    setLikeNumber(newLikeNumber);

    Axios.post("/api/like/getPostLikes", variable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setLikeNumber(response.data.likesNumber);
          } else {
            alert("좋아요 정보를 가져오는 데 실패했습니다.");
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
      source.cancel("Cancelling in cleanup");
    };
  }, [newLikeNumber, postId]);
  return (
    <>
      {likeNumber > 0 && (
        <Section detailPage={detailPage}>
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
