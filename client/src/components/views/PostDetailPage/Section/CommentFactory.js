import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";

function CommentFactory(props) {
  const { refreshReplyComment, postId, newPostId } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const variable = { postId: postId };
    if (newPostId || postId) {
      Axios.post("/api/comment/getComments", variable).then((response) => {
        if (response.data.success) {
          setComments(response.data.comments);
        } else {
          alert("댓글 정보를 불러오는 데 실패했습니다.");
        }
      });
    }
  }, [newPostId, postId]);

  return (
    <>
      {comments.length !== 0 && (
        <Comment>
          {comments.map(
            (comment, index) =>
              !comment.responseTo && (
                <li key={index}>
                  <SingleComment
                    comment={comment}
                    refreshReplyComment={refreshReplyComment}
                  />
                  <ReplyComment
                    comments={comments}
                    refreshReplyComment={refreshReplyComment}
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
  li {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a:hover {
        text-decoration: underline;
      }
      .comment {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    button {
      cursor: pointer;
      padding: 0;
      display: flex;
      background-color: transparent;
    }
  }
`;
