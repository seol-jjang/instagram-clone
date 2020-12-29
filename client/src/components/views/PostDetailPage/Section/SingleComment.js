import React from "react";
import { Link } from "react-router-dom";
import { UserNickname } from "../../../../styles/Theme";
import styled from "styled-components";

function SingleComment(props) {
  const { comment, refreshReplyComment } = props;
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
              {/* {props.likeNumber > 0 && (
                <button>좋아요 {props.likeNumber}개</button>
              )} */}
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
