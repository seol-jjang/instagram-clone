import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SubText, UserNickname } from "../../../../styles/Theme";
import LikeBtn from "../../../utils/LikeBtn";

function DetailContent(props) {
  const { post, refreshPostId } = props;
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const variable = { postId: post._id };
    if (refreshPostId || post._id) {
      Axios.post("/api/comment/getCommentsCount", variable).then((response) => {
        if (response.data.success) {
          setCommentsCount(response.data.commentCount);
        } else {
          alert("댓글 정보를 불러오는 데 실패했습니다.");
        }
      });

      Axios.post("/api/comment/getCommentsLimit", variable).then((response) => {
        if (response.data.success) {
          setComments(response.data.comments.reverse());
        } else {
          alert("댓글 정보를 불러오는 데 실패했습니다.");
        }
      });
    }
  }, [post._id, refreshPostId]);

  return (
    <DetailContentsWrap>
      <div>
        <PostContent>
          <Link to={`/user/${post.userFrom.nickname}`}>
            <UserNickname>{post.userFrom.nickname}</UserNickname>
          </Link>
          <Description>{post.description}</Description>
        </PostContent>
      </div>
      {comments.length !== 0 && (
        <Comment>
          <Link to={`/p/${props.postId}`}>
            <SubText>댓글 {commentsCount}개 모두보기</SubText>
          </Link>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <div>
                  <Link to={`/${comment.userFrom.nickname}`}>
                    <UserNickname>{comment.userFrom.nickname}</UserNickname>
                  </Link>
                  <span className="comment">{comment.content}</span>
                </div>
                <LikeBtn commentId={comment._id} />
              </li>
            ))}
          </ul>
        </Comment>
      )}
    </DetailContentsWrap>
  );
}

export default DetailContent;

const DetailContentsWrap = styled.div`
  background-color: white;
  & > div {
    padding: 0 12px;
  }
`;

const PostContent = styled.span`
  line-height: 1.1;
  a:hover {
    text-decoration: underline;
  }
  .elle {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Description = styled.span`
  font-size: 14px;
  margin-left: 5px;
  white-space: pre-line;
`;

const Comment = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  li {
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
