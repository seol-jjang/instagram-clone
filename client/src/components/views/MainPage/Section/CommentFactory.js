import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserNickname, SubText } from "../../../../styles/Theme";
import styled from "styled-components";
import AddComment from "../../../utils/AddComment";
import LikeBtn from "../../../utils/LikeBtn";

function CommentFactory(props) {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [likeNumber, setLikeNumber] = useState(0);

  useEffect(() => {
    const variable = { postId: props.postId };
    getComments(variable);
    Axios.post("/api/comment/getCommentsCount", variable).then((response) => {
      if (response.data.success) {
        setCommentsCount(response.data.commentCount);
      } else {
        alert("댓글 정보를 불러오는 데 실패했습니다.");
      }
    });
  }, [props.postId]);

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  const getComments = (variable) => {
    Axios.post("/api/comment/getCommentsLimit", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("댓글 정보를 불러오는 데 실패했습니다.");
      }
    });
  };

  const refreshComment = (likes) => {
    setCommentsCount(likes);
  };

  return (
    <>
      {comments.length !== 0 && (
        <Comment>
          <Link to={`/p/${props.postId}`}>
            <SubText>댓글 {commentsCount}개 모두보기</SubText>
          </Link>
          <section>
            {comments.map((comment, index) => (
              <article key={index}>
                <div>
                  <Link to={`/${comment.userFrom.nickname}`}>
                    <UserNickname>{comment.userFrom.nickname}</UserNickname>
                  </Link>
                  <span className="comment">{comment.content}</span>
                </div>
                <LikeBtn commentId={comment._id} refreshLike={refreshLike} />
              </article>
            ))}
          </section>
        </Comment>
      )}
      <AddComment postId={props.postId} refreshComment={refreshComment} />
    </>
  );
}

export default CommentFactory;

const Comment = styled.div`
  padding: 12px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  article {
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
    div {
      display: flex;
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
    .like {
      fill: #ff1b3e;
    }
  }
`;
