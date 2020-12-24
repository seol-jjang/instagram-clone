import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { UserNickname, SubText } from "../../../../styles/Theme";
import styled from "styled-components";
import AddComment from "../../../utils/AddComment";

function CommentFactory(props) {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

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

  const getComments = (variable) => {
    Axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("댓글 정보를 불러오는 데 실패했습니다.");
      }
    });
  };

  const refreshComment = (variable) => {
    getComments(variable);
    setCommentsCount(commentsCount + 1);
  };
  return (
    <>
      {comments.length !== 0 && (
        <Comment>
          <Link to={`/`}>
            <SubText>댓글 {commentsCount}개 모두보기</SubText>
          </Link>
          <section>
            {comments.map((comment, index) => (
              <article key={index}>
                <div>
                  <Link to={`/${comment.userFrom.nickname}`}>
                    <UserNickname>{comment.userFrom.nickname}</UserNickname>
                  </Link>
                  <span>{comment.content}</span>
                </div>
                <button>
                  <BsHeart size="12px" />
                </button>
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
      span {
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
