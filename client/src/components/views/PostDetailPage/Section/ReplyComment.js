import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const { comments, addReplyComment, deleteComment, parentCommentId } = props;
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
          <li key={index}>
            <SingleComment
              comment={comment}
              addReplyComment={addReplyComment}
              deleteComment={deleteComment}
            />
            <ReplyComment
              comments={comments}
              addReplyComment={addReplyComment}
              deleteComment={deleteComment}
              parentCommentId={comment._id}
            />
          </li>
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

const ReplyWrap = styled.ul`
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
