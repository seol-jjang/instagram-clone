import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserNickname } from "../../../../styles/Theme";
import styled from "styled-components";
import Axios from "axios";

function SingleComment(props) {
  const { comment, refreshReplyComment } = props;
  const [likeNumber, setLikeNumber] = useState(0);

  useEffect(() => {
    const likeVariable = {
      commentId: comment._id
    };

    Axios.post("/api/like/getLikes", likeVariable).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likes.length);
      } else {
        alert("좋아요 정보를 가져오는 데 실패했습니다.");
      }
    });
  }, [comment._id]);
  return (
    <>
      {comment.userFrom && (
        <>
          <ContentWrap>
            <div>
              <Link to={`/${comment.userFrom.nickname}`}>
                <UserNickname>{comment.userFrom.nickname}</UserNickname>
              </Link>
              <span className="comment">{comment.content}</span>
            </div>
            <div>
              {likeNumber > 0 && <button>좋아요 {likeNumber}개</button>}
              <button
                onClick={() =>
                  refreshReplyComment(comment.userFrom.nickname, comment._id)
                }
              >
                답글 달기
              </button>
            </div>
          </ContentWrap>
        </>
      )}
    </>
  );
}

export default SingleComment;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  div:last-child {
    display: flex;
    button {
      color: gray;
      font-weight: bold;
      margin-top: 5px;
      margin-right: 10px;
    }
  }
`;
