import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsHeart, BsHeartFill, BsChat } from "react-icons/bs";
import { ProfileIcon, UserNickname } from "../../../../styles/Theme";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const { comments, refreshReplyComment, parentCommentId } = props;
  const [replyCommentNumber, setReplyCommentNumber] = useState(0);
  const [openReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    // eslint-disable-next-line array-callback-return
    comments.map((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setReplyCommentNumber(commentNumber);
  }, [comments, parentCommentId]);
  const renderReplyComment = (parentCommentId) =>
    comments.map(
      (comment, index) =>
        comment.responseTo === parentCommentId && (
          <article key={index}>
            <div>
              <Writer>
                <ProfileIcon size="medium" className="profile-image">
                  <Link to={`/user/${comment.userFrom.nickname}`}>
                    <img
                      src={`http://localhost:5000/${comment.userFrom.profileImage}`}
                      alt={comment.userFrom.nickname}
                    />
                  </Link>
                </ProfileIcon>
                <SingleComment
                  comment={comment}
                  refreshReplyComment={refreshReplyComment}
                />
              </Writer>
              <button>
                <BsHeart size="12px" />
              </button>
            </div>
            <ReplyComment
              comments={comments}
              refreshReplyComment={refreshReplyComment}
              parentCommentId={comment._id}
            />
          </article>
        )
    );

  const onHandleClick = () => {
    setOpenReplyComment(!openReplyComment);
  };
  return (
    <ReplyWrap>
      <div>
        {replyCommentNumber > 0 &&
          (openReplyComment ? (
            <CommentOpenBtn onClick={onHandleClick}>답글 숨기기</CommentOpenBtn>
          ) : (
            <CommentOpenBtn onClick={onHandleClick}>
              답글 보기({replyCommentNumber}개)
            </CommentOpenBtn>
          ))}
      </div>
      {openReplyComment && renderReplyComment(parentCommentId)}
    </ReplyWrap>
  );
}

export default ReplyComment;

const Writer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  .profile-image {
    margin-right: 15px;
  }
  .description {
    margin-left: 10px;
  }
`;

const ReplyWrap = styled.div`
  margin-left: 30px;
`;

const CommentOpenBtn = styled.p`
  cursor: pointer;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: gray;
  font-weight: bold;
`;
