import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";

function CommentFactory(props) {
  const { refreshReplyComment, postId, newComment } = props;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();

    const variable = { postId: postId };

    Axios.post("/api/comment/getComments", variable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setComments(response.data.comments);
          } else {
            alert("댓글 정보를 불러오는 데 실패했습니다.");
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
      source.cancel("Canceling in cleanup");
    };
  }, [postId, newComment]);

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
