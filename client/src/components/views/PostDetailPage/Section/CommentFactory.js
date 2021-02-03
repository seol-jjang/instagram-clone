import React from "react";
import styled from "styled-components";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";

function CommentFactory(props) {
  const { addReplyComment, deleteComment, comments } = props;

  return (
    <>
      {comments && comments.length !== 0 && (
        <Comment>
          {comments.map(
            (comment, index) =>
              !comment.responseTo && (
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
          )}
        </Comment>
      )}
    </>
  );
}

export default CommentFactory;

const Comment = styled.ul`
  display: flex;
  flex-direction: column;
  & > li {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    button {
      cursor: pointer;
      padding: 0;
      display: flex;
      background-color: transparent;
    }
  }
`;
