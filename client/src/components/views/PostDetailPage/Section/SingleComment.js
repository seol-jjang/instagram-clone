import React from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill, BsChat } from "react-icons/bs";
import { ProfileIcon, UserNickname } from "../../../../styles/Theme";
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
            <button
              onClick={() =>
                refreshReplyComment(comment.userFrom.nickname, comment._id)
              }
            >
              답글 달기
            </button>
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
  button {
    color: gray;
    font-weight: bold;
    margin-top: 5px;
  }
`;
